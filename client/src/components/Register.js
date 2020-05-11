import React, { Component } from "react";
import { Form, Input, Button, Grid, Message } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            email: "",
            login: true,
            address: "login",
            error: false,
            errorMsg: "",
            loading: false,
        };
    }

    handleOnChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleOnSubmit = async () => {
        this.setState({ error: false, loading: true });
        try {
            const res = await axios({
                method: "post",
                url: `/api/${this.state.address}`,
                data: this.state,
            });
            cookie.set("registered", { token: res.data.token });
            window.location.reload(false);
        } catch (error) {
            this.setState({ errorMsg: error.response.data.error, error: true });
        }
        this.setState({ loading: false });
    };

    handleChangeSignUp = async () => {
        this.setState({ login: false, address: "register", error: false });
    };
    handleChangeLogin = async () => {
        this.setState({ login: true, address: "login", error: false });
    };

    render() {
        return (
            <div>
                <Grid verticalAlign="middle">
                    <Grid.Row textAlign="center">
                        <Grid.Column width={8}>
                            <Button onClick={this.handleChangeLogin} fluid>
                                Login
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button onClick={this.handleChangeSignUp} fluid>
                                Sign up
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form
                                onSubmit={this.handleOnSubmit}
                                style={{ margin: "10px" }}
                                error={this.state.error}
                            >
                                {this.state.login ? null : (
                                    <Form.Field>
                                        <Input
                                            placeholder="User Name"
                                            value={this.state.userName}
                                            name="userName"
                                            onChange={this.handleOnChange}
                                        ></Input>
                                    </Form.Field>
                                )}

                                <Form.Field>
                                    <Input
                                        placeholder="Email"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleOnChange}
                                    ></Input>
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        placeholder="password"
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.handleOnChange}
                                        type="password"
                                    ></Input>
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        primary
                                        loading={this.state.loading}
                                        fluid
                                    >
                                        {this.state.address}
                                    </Button>
                                </Form.Field>
                                <Message
                                    error
                                    header="Error!!"
                                    content={this.state.errorMsg}
                                />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Register;
