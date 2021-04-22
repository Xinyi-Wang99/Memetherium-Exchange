import { Button, Icon, Form } from "semantic-ui-react";
import React from "react";

function AddCaption({ currentImage, topText, bottomText, handleTextChange, convert, loading }) {
    const{src, alt } = currentImage;
    return (
        <div>
            {(src) ?
                <div>
                    <h2>Selected Meme: <em>{alt}</em></h2>
                </div> : ""}
            <Form onSubmit={convert}>
                <Form.Field>
                    <label>Top Text</label>
                    <input
                        name="topText"
                        value={topText}
                        placeholder="Enter Top Text"
                        onChange={handleTextChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Bottom Text</label>
                    <input
                        name="bottomText"
                        value={bottomText}
                        placeholder="Enter Bottom Text"
                        onChange={handleTextChange}
                    />
                </Form.Field>
                <Button primary type="submit" loading={loading}>
                    <Icon name="check" /> Download Meme
                </Button>
            </Form>
        </div>
    );
}
export default AddCaption;