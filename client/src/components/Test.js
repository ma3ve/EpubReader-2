import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

class Test extends Component {
    render() {
        return (
            <div>
                <Grid style={{ border: "5px solid red", height: "100vh" }}>
                    <Grid.Row style={{ border: "5px solid orange" }}>
                        <Grid.Column style={{ border: "5px solid violet" }}>
                            <Grid
                                style={{
                                    border: "5px dotted blue",
                                    height: "100%",
                                }}
                                columns={2}
                            >
                                <Grid.Column
                                    style={{ border: "5px solid green" }}
                                >
                                    hello friend
                                </Grid.Column>
                                <Grid.Column
                                    style={{ border: "5px solid pink" }}
                                >
                                    how r u
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Test;
