import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Grid } from "semantic-ui-react";
class TextFontSetting extends Component {
    handleClick = (e) => {
        const { value } = e.currentTarget;

        this.props.changeTheme(value);
    };

    render() {
        return (
            <React.Fragment>
                <Grid centered verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column>
                            <Button
                                fullWidth={true}
                                style={{
                                    background: "black",
                                    color: "#A1A1A1",
                                    margin: "10px",
                                }}
                                value="night"
                                onClick={this.handleClick}
                            >
                                Night
                            </Button>
                            <br />
                            <Button
                                fullWidth
                                style={{
                                    background: "black",
                                    color: "white",
                                    margin: "10px",
                                }}
                                value="night-contrast"
                                onClick={this.handleClick}
                            >
                                Night Contrast
                            </Button>
                            <br />
                            <Button
                                fullWidth
                                style={{
                                    background: "#F5DEB3",
                                    color: "#644D32",
                                    margin: "10px",
                                }}
                                value="sepia"
                                onClick={this.handleClick}
                            >
                                Sepia
                            </Button>
                            <br />
                            <Button
                                fullWidth
                                style={{
                                    background: "#F5DEB3",
                                    color: "black",
                                    margin: "10px",
                                }}
                                value="sepia-contrast"
                                onClick={this.handleClick}
                            >
                                Sepia Contrast
                            </Button>
                            <br />
                            <Button
                                fullWidth
                                style={{
                                    background: "black",
                                    color: "#008000",
                                    margin: "10px",
                                }}
                                value="console"
                                onClick={this.handleClick}
                            >
                                Console
                            </Button>
                            <br />
                            <Button
                                fullWidth
                                style={{
                                    background: "white",
                                    color: "#black",
                                    margin: "10px",
                                }}
                                value="day"
                                onClick={this.handleClick}
                            >
                                Day
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}

export default TextFontSetting;
