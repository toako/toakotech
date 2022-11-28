import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import styles from "../../../styles/techs/palette/PositionSelector.module.css";
import GlobalFunctions from "../../../lib/GlobalFunctions";

export default function PositionSelector (props) {
    const [amountArray, setAmountArray] = useState(GlobalFunctions.createArrayOfIntegers(props.amount, false));

    //Changes position # in parent component
    const handleClick = (e, pos) => {
        e.preventDefault; 
        props.changePosition(pos - 1);
    }

    //When the amount prop (colorAmount in parent state) changes, recreate an array of numbers
    useEffect(() => {
        setAmountArray(GlobalFunctions.createArrayOfIntegers(props.amount, false));
    }, [props.amount]);

    return (<Row className="mx-0 mt-3">
        { amountArray.map((_, i) => <PositionBox key={i} index={i} clickHandler={handleClick} position={props.position}/>)}
    </Row>);
}

//Selectable box component for changing position
function PositionBox (props) {
    const displayIndex = props.index + 1;
    return (
        <Col className="p-0 m-0">
            <div 
                id={`posButton${displayIndex}`}
                className={`${styles.posButton} ${props.position == props.index ? styles.selected : ""}`}
                onClick={(e) => props.clickHandler(e, displayIndex)}>
            </div>
            <p className="text-center">{displayIndex}</p>
        </Col>
    );
}