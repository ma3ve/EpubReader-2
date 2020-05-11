import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { EpubView } from "react-reader";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";
import logo from "./loader2.gif";
import axios from "axios";
import cookie from "js-cookie";

class Reader extends Component {
    constructor(props) {
        super(props);
        this.readerRef = React.createRef();
        this.state = {
            rendition: null,
            height: 0,
            width: 0,
            toc: [],
            fontSize: 12,
            buttonColor: "grey",
            book: undefined,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    next = () => {
        const node = this.readerRef.current;
        node.nextPage();
    };

    prev = () => {
        const node = this.readerRef.current;
        node.prevPage();
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    getRendition = (rendition) => {
        this.setState({ rendition }, () => {
            rendition.themes.register("night", { body: { color: "#A1A1A1" } });
            rendition.themes.register("night-contrast", {
                body: { color: "#FFFFFF" },
            });
            rendition.themes.register("sepia", { body: { color: "#644D32" } });
            rendition.themes.register("sepia-contrast", {
                body: { color: "#000000" },
            });
            rendition.themes.register("console", {
                body: { color: "#008000" },
            });
            rendition.themes.register("day", {
                body: { color: "black" },
            });
            if (this.props.user) {
                this.changeTheme(this.props.user.theme);
                this.changeFontSize(this.props.user.fontSize);
                this.changeFlow(this.props.user.flow);
            }
        });
    };

    locationChanged = async (page) => {
        if (this.props.user) {
            await axios.patch(
                "/api/page",
                { page },
                {
                    headers: {
                        Authorization: this.props.token.token,
                    },
                }
            );
            // console.log(page);
        }
    };

    tocChanged = (toc) => {
        this.setState({ toc });
    };

    changeTheme = async (value) => {
        this.state.rendition.themes.select(value);
        switch (value) {
            case "night": {
                document.body.style.backgroundColor = "black";
                break;
            }
            case "night-contrast": {
                document.body.style.backgroundColor = "black";
                break;
            }
            case "sepia": {
                document.body.style.backgroundColor = "#F5DEB3";
                break;
            }
            case "sepia-contrast": {
                document.body.style.backgroundColor = "#F5DEB3";
                break;
            }
            case "console": {
                document.body.style.backgroundColor = "black";
                break;
            }
            case "day": {
                document.body.style.backgroundColor = "white";
                break;
            }
            default:
                document.body.style.backgroundColor = "white";
        }
        if (this.props.user) {
            await axios.patch(
                "/api/theme",
                { theme: value },
                {
                    headers: {
                        Authorization: this.props.token.token,
                    },
                }
            );
        }
    };

    changeFontSize = async (fontSize) => {
        this.state.rendition.themes.fontSize(fontSize + "px");
        if (this.props.user) {
            setTimeout(async () => {
                if (this.state.fontSize === fontSize) {
                    console.log(fontSize);

                    await axios.patch(
                        "/api/fontSize",
                        { fontSize },
                        {
                            headers: {
                                Authorization: this.props.token.token,
                            },
                        }
                    );
                }
            }, 5000);
        }

        this.setState({ fontSize });
    };

    changeFlow = async (flow) => {
        this.state.rendition.flow(flow);

        if (this.props.user) {
            await axios.patch(
                "/api/flow",
                { flow },
                {
                    headers: {
                        Authorization: this.props.token.token,
                    },
                }
            );
        }
    };

    signOut = async () => {
        cookie.remove("registered");
        window.location.reload(false);
    };

    deleteBook = async () => {
        try {
            await axios.delete("/api/book", {
                headers: {
                    Authorization: this.props.token.token,
                },
            });
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const { Book } = this.props;
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={1}>
                    <LeftSide
                        prev={this.prev}
                        height={this.state.height}
                        toc={this.state.toc}
                        rendition={this.state.rendition}
                        buttonColor={this.state.buttonColor}
                    />
                </Grid>

                <Grid
                    item
                    xs={10}
                    style={{ height: this.state.height - 30, width: "300px" }}
                >
                    <EpubView
                        url={Book}
                        ref={this.readerRef}
                        loadingView={
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "10%",
                                    right: "10%",
                                    color: "#ccc",
                                    textAlign: "center",
                                    margintop: "-.5em",
                                }}
                            >
                                <img src={logo} alt="loading..." />
                            </div>
                        }
                        locationChanged={this.locationChanged}
                        getRendition={this.getRendition}
                        tocChanged={this.tocChanged}
                        location={this.props.user ? this.props.user.page : null}
                    />
                </Grid>

                <Grid item xs={1}>
                    <RightSide
                        next={this.next}
                        height={this.state.height}
                        changeFontSize={this.changeFontSize}
                        fontSize={this.state.fontSize}
                        changeTheme={this.changeTheme}
                        changeFont={this.changeFont}
                        buttonColor={this.state.buttonColor}
                        changeFlow={this.changeFlow}
                        signOut={this.signOut}
                        deleteBook={this.deleteBook}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default Reader;
