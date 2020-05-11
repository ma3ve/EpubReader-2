import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Settings from "./Settings";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";

class RightSide extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    style={{ height: this.props.height - 30 }}
                >
                    <Grid item>
                        <Settings
                            changeFontSize={this.props.changeFontSize}
                            fontSize={this.props.fontSize}
                            changeTheme={this.props.changeTheme}
                            buttonColor={this.props.buttonColor}
                            changeFont={this.props.changeFont}
                            changeFlow={this.props.changeFlow}
                            signOut={this.props.signOut}
                            deleteBook={this.props.deleteBook}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton onClick={this.props.next}>
                            <ChevronRightIcon
                                fontSize="large"
                                style={{ color: this.props.buttonColor }}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item></Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default RightSide;
