import React, { Component } from "react";
import Reader from "../components/Reader";
import Upload from "../components/Upload";
import Register from "../components/Register";
import axios from "axios";
import cookie from "js-cookie";
import { Grid, Button } from "semantic-ui-react";
import logo from "../components/loader2.gif";

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            Book: null,
            BookFile: null,
            token: null,
            read: false,
            loading: null,
            load: false,
        };
    }

    componentDidMount = async () => {
        const jsonToken = cookie.get("registered");
        if (jsonToken) {
            this.changeLoadingMessage("logging in");
            const token = JSON.parse(jsonToken);
            this.setState({ token });
            if (token.token) {
                try {
                    const res = await axios({
                        method: "get",
                        url: "/api/user",
                        headers: {
                            Authorization: token.token,
                            crossorigin: "anonymous",
                        },
                    });
                    this.setState({ user: res.data.user, loading: null });
                    if (res.data.user.book) {
                        this.changeLoadingMessage("Downloading Book");

                        var request = new XMLHttpRequest();
                        request.open("GET", "/api/book", true);
                        request.setRequestHeader("Authorization", token.token);
                        request.responseType = "blob";
                        request.onload = () => {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(request.response);
                            reader.onload = (e) => {
                                this.setState(
                                    {
                                        Book: e.target.result,
                                        read: true,
                                    },
                                    () => {
                                        this.changeLoadingMessage(null);
                                    }
                                );
                            };
                        };
                        request.send();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
    getBook = (Book) => {
        this.setState({ Book });
    };

    getBookFile = (BookFile) => {
        this.setState({ BookFile: BookFile });
    };
    UploadFile = async () => {
        this.setState({ load: true });
        if (this.state.BookFile && this.state.token.token) {
            const data = new FormData();
            data.append("image", this.state.BookFile);
            try {
                await axios.post("/api/bookUpload", data, {
                    headers: {
                        Authorization: this.state.token.token,
                        "content-Type": "multipart/form-data ",
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }
        this.setState({ load: false });
    };

    changeLoadingMessage = (message) => {
        this.setState({ loading: message });
    };

    render() {
        return !this.state.loading ? (
            this.state.Book && this.state.read ? (
                <Reader
                    Book={this.state.Book}
                    user={this.state.user}
                    token={this.state.token}
                />
            ) : !this.state.user ? (
                <Grid style={{ height: "100vh", margin: "0" }}>
                    <Grid.Column width={5} only="computer">
                        <Grid container>
                            <h1>hello</h1>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={11} style={{ height: "100%" }}>
                        <Grid
                            style={{ height: "100%" }}
                            verticalAlign="middle"
                            stackable
                        >
                            <Grid.Row>
                                <Grid.Column stretched width={10}>
                                    <Register />
                                </Grid.Column>
                                <Grid.Column
                                    style={{ height: "100%" }}
                                    width={6}
                                    verticalAlign="middle"
                                >
                                    <Grid centered style={{ height: "100%" }}>
                                        <Grid.Column verticalAlign="middle">
                                            <Upload getBook={this.getBook} />
                                            <br />

                                            <Button
                                                onClick={() => {
                                                    this.setState({
                                                        read: !this.state.read,
                                                    });
                                                }}
                                            >
                                                Read
                                            </Button>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid>
            ) : (
                <Grid centered style={{ height: "100vh" }}>
                    <Grid.Row verticalAlign="bottom">
                        <Grid.Column textAlign="center">
                            <Upload
                                getBook={this.getBook}
                                getBookFile={this.getBookFile}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign="top">
                        <Grid.Column textAlign="center">
                            <Button
                                onClick={this.UploadFile}
                                loading={this.state.load}
                            >
                                save to cloud
                            </Button>

                            <Button
                                onClick={() => {
                                    this.setState({
                                        read: !this.state.read,
                                    });
                                }}
                            >
                                Read right now
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        ) : (
            <Grid style={{ height: "100vh" }} verticalAlign="middle">
                {console.log(this.state.loading)}
                <Grid.Column textAlign="center">
                    <img src={logo} alt="loading..." />
                    <h3>{this.state.loading}</h3>
                </Grid.Column>
            </Grid>
        );
    }
}
export default App;
