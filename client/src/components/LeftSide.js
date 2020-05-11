import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Chapters from "./Chapters";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

class LeftSide extends Component {
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
                        <Chapters
                            toc={this.props.toc}
                            rendition={this.props.rendition}
                            buttonColor={this.props.buttonColor}
                            // {...console.log(this.props.rendition)}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton onClick={this.props.prev}>
                            <ChevronLeftIcon
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

export default LeftSide;
