import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

export default function InfoPopover(props) {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{props.title}</Popover.Header>
            <Popover.Body>{props.textBody}</Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button size="sm" variant="info">{props.textButton}</Button>
        </OverlayTrigger>
    );
}