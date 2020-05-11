import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";

class FlowOverRides extends Component {
    handleOnClick = (e, { value }) => {
        // console.log(value);
        this.props.changeFlow(value);
    };

    render() {
        return (
            <React.Fragment>
                <Grid columns="equal">
                    <Grid.Row>
                        <Grid.Column>
                            <Button
                                value="paginated"
                                onClick={this.handleOnClick}
                            >
                                Paginated
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                value="scrolled-doc"
                                onClick={this.handleOnClick}
                            >
                                Scrolled
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}

export default FlowOverRides;
