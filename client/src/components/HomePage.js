import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import Register from "./Register";
import Upload from "./Upload";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showRegister: true,
        };
    }

    toggleShowRegister = () => {
        this.setState({ showRegister: !this.state.showRegister });
    };

    render() {
        return (
            <Container>
                <Grid verticalAlign="middle" centered>
                    <Grid.Row centered>
                        <Grid.Column width={10}>
                            {this.state.showRegister ? (
                                <React.Fragment>
                                    <Register
                                        toggleShowRegister={
                                            this.toggleShowRegister
                                        }
                                    />
                                    <br />
                                </React.Fragment>
                            ) : null}

                            <Upload />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default HomePage;
