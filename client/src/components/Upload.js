import React, { Component } from "react";
import { Button } from "@material-ui/core";
// import { Grid } from "semantic-ui-react";

export class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleOnChange = (event) => {
        if (event.target.files[0].type === "application/epub+zip") {
            if (this.props.getBookFile) {
                this.props.getBookFile(event.target.files[0]);
            }

            let reader = new FileReader();
            reader.readAsArrayBuffer(event.target.files[0]);

            reader.onload = () => {
                this.props.getBook(reader.result);
            };
        } else {
            alert("Only .epub Files are supported");
        }
    };

    render() {
        return (
            <div>
                <input
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: "none" }}
                    onChange={this.handleOnChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        size="large"
                    >
                        Upload
                    </Button>
                </label>
            </div>
        );
    }
}

export default Upload;
