import React, { Component } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import ViewListIcon from "@material-ui/icons/ViewList";
import List from "@material-ui/core/List";
import TocItem from "./TocItem";

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
        const { toc } = this.props;
        return (
            <div>
                <IconButton onClick={this.toggleDrawer}>
                    <ViewListIcon style={{ color: this.props.buttonColor }} />
                </IconButton>
                <Drawer
                    anchor="left"
                    onClose={this.toggleDrawer}
                    open={this.state.open}
                >
                    {/* {console.log(toc)} */}
                    <List key="0">
                        {toc.map((res, i) => (
                            <TocItem
                                res={res}
                                rendition={this.props.rendition}
                                // i={i}
                                key={i}
                            />
                        ))}
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default Chapters;
