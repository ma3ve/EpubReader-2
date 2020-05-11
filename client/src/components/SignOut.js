import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class SignOut extends Component {
    render() {
        return (
            <div>
                <Button primary onClick={this.props.signOut}>
                    SignOut
                </Button>
            </div>
        );
    }
}

export default SignOut;
