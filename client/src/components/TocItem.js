import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class TocItem extends Component {
    handleOnClick = () => {
        const { rendition, res } = this.props;
        rendition.display(res.href);
    };

    render() {
        const { res } = this.props;
        // console.log(i);

        return (
            <ListItem button onClick={this.handleOnClick}>
                <ListItemText primary={res.label} />
            </ListItem>
        );
    }
}

export default TocItem;
