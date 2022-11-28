import React from "react";
import { Row, Col } from "react-bootstrap";

import styles from "../../../styles/techs/palette/PaletteViewer.module.css";

export default function PaletteView (props) {

    const colorRange = props.colors.split(","); //An array of colors inputted from props

    const copyColor = (e, color) => {
        e.preventDefault();
        navigator.clipboard.writeText(`#${color}`)
    }

    return (<Row>
        {colorRange.map(c => {
            return <Col key={c} className="p-1 text-center" xs={3} sm={2} lg={1} onClick={(e) => copyColor(e, c)}>
                <div className={styles.swatch} style={{backgroundColor: `#${c}`}}></div>
                <p>{`#${c}`}</p>
            </Col>
        })}
    </Row>);
}