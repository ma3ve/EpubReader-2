import React, { Component } from "react";
import {
    Drawer,
    IconButton,
    ExpansionPanel,
    ExpansionPanelDetails,
    Typography,
    ExpansionPanelSummary,
} from "@material-ui/core";
import { Grid, Button } from "semantic-ui-react";
import SettingsIcon from "@material-ui/icons/Settings";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextSizeSetting from "./TextSizeSetting";
import ThemeSetting from "./ThemeSetting";
import FlowOverRides from "./FlowOverRides";
// import Upload from "./Upload";

class Chapters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    toggleDrawer = () => {
        const { open } = this.state;
        this.setState({ open: !open });
    };

    render() {
        return (
            <div>
                <IconButton onClick={this.toggleDrawer}>
                    <SettingsIcon style={{ color: this.props.buttonColor }} />
                </IconButton>
                <Drawer
                    anchor="right"
                    onClose={this.toggleDrawer}
                    open={this.state.open}
                >
                    <Grid style={{ maxWidth: "300px" }}>
                        <Grid.Column width={16}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Text Size</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TextSizeSetting
                                        changeFontSize={
                                            this.props.changeFontSize
                                        }
                                        fontSize={this.props.fontSize}
                                    />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Themes</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails
                                    style={{ alignItems: "center" }}
                                >
                                    <ThemeSetting
                                        changeTheme={this.props.changeTheme}
                                    />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Page OverFlow</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails
                                    style={{ alignItems: "center" }}
                                >
                                    <FlowOverRides
                                        changeFlow={this.props.changeFlow}
                                    />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <br />
                            <Button onClick={this.props.signOut} fluid>
                                SignOut
                            </Button>
                            <br />
                            <Button
                                onClick={this.props.deleteBook}
                                fluid
                                negative
                            >
                                Delete this book
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default Chapters;
