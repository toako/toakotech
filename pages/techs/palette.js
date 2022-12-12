import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import chroma from "chroma-js";

import styles from "../../styles/techs/palette/palette.module.css";
import Navigation from "../../components/techs/core/Navigation";
import TechsHeader from "../../components/techs/core/TechsHeader";
import PaletteView from "../../components/techs/palette/PaletteViewer";
import ChromePicker from "react-color";
import PositionSelector from "../../components/techs/palette/PositionSelector";

class Palette extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            genMethod: 1,
            displayColorPicker: false,
            colorAmount: 12,
            colorPosition: 0,
            colorRange: "f42613,ff5000,ffc825,7cf413,0da335,10c3cc,104ccc,7110cc,f413b5,85503a,000000,dddddd",
            color1: { h: 0, s: 1.0, l: 0.5 },
            color2: { h: 240, s: 1.0, l: 0.5 },
            hueStep: 0,
            satStep: 0,
            lightStep: 0
        };

        this.changeGenMethod = this.changeGenMethod.bind(this);
        this.changeColorAmount = this.changeColorAmount.bind(this);
        this.toggleColorPicker = this.toggleColorPicker.bind(this);
        this.closeColorPicker = this.closeColorPicker.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.changeValueRange = this.changeValueRange.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.generateColorRangePosition = this.generateColorRangePosition.bind(this);
    }

    //Functions for main settings
    changeGenMethod (e) { e.preventDefault(); this.setState(state => ({ genMethod: state.genMethod === 0 ? 1 : 0 })); }
    changeColorAmount (e, min, max) {
        e.preventDefault();

        this.setState({ 
            colorAmount: e.target.value > max ? max : (e.target.value < min ? min : e.target.value), //Always keep the number within the min and max bounds (range)
            colorPosition: 0 //Reset color position
        });
    }

    //Functions for changing color
    toggleColorPicker (e) { e.preventDefault(); this.setState(state => ({displayColorPicker: !state.displayColorPicker})); }
    closeColorPicker () { this.setState({ displayColorPicker: false }); };
    changeColor (color, event) { this.setState({ color1: color.hsl }); };

    //Functions for sliders and number inputs
    changeValue (e) { e.preventDefault(); this.setState({ [e.target.name]:e.target.value }); }
    changeValueRange (e, min, max) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value > max ? max : (e.target.value < min ? min : e.target.value) }); //Always keep the number within the min and max bounds (range)
    }

    //Functions for changing position
    changePosition (pos) {this.setState({colorPosition: pos});}

    //Main function for generating the color range when in position mode
    generateColorRangePosition (e) {
        e.preventDefault();
        
        //const colorsBefore = this.state.colorPosition; //Amount of colors to generate before position of base color
        //const colorsAfter = this.state.colorAmount - this.state.colorPosition - 1; //Amount of colors to generate after position of base color
        let colorIntMap = [];

        for (let i = 0; i < this.state.colorAmount; i++) { 
            const value = this.state.colorPosition - i === 0 ? 0 : -(this.state.colorPosition - i);
            colorIntMap.push(value); 
        }
        console.log(`Base Color: ${this.state.color1.h} ${this.state.color1.s} ${this.state.color1.l}`);
        console.log(`Steps: ${this.state.hueStep} ${this.state.satStep} ${this.state.lightStep}`);

        //Maps out the colors off the base color
        let colorMap = colorIntMap.map(pos => {
            let tempHue = Math.floor(this.state.color1.h + this.state.hueStep * pos);
            let tempSat = this.state.color1.s + this.state.satStep * pos / 100;
            let tempLight = this.state.color1.l + this.state.lightStep * pos / 100;

            //Bounds hue between 0 and 360
            if (tempHue > 360) tempHue = tempHue % 360;
            else if (tempHue < 0) tempHue = tempHue % 360 + 360;

            //Bounds saturation between 0 and 1
            if (tempSat > 1) tempSat = tempSat % 1;
            else if (tempSat < 0) tempSat = tempSat % 1 + 1;

            //Bounds lightness between 0 and 1
            if (tempLight > 1) tempLight = tempLight % 1;
            else if (tempLight < 0) tempLight = tempLight % 1 + 1;

            return [tempHue, tempSat, tempLight];
        });
        colorMap[this.state.colorPosition] = [this.state.color1.h, this.state.color1.s, this.state.color1.l];
        let colorMapHex = colorMap.map (color => chroma.hsl(color[0], color[1], color[2]).hex().replace("#", ""));
        
        this.setState({
            colorRange: ("" + colorMapHex)
        });
    }

    render() {
        return (<div>
            <Navigation />
            <TechsHeader page="Color Palette Generator" title="Color Palette Generator: Generate color ranges to be used in a color palette. Generated colors can be copied by clicking on them." />
            <Container>
                <PaletteView colors={this.state.colorRange}/>
                <Row className="mt-3">
                    {/* MAIN SETTINGS */}
                    <Col xs={12} md={6} className="px-3 px-lg-5">
                        <h5 className="text-center">Main Settings</h5>
                        <hr/>
                        {/* <Row className="align-items-center mb-3">
                            <Col xs={8}><p className="mb-0">Palette Generation Method</p></Col>
                            <Col xs={4} className="text-right">
                                <Button className="font-weight-bold" size="sm" variant={this.state.genMethod === 0 ? "primary" : "danger"} onClick={(e) => this.changeGenMethod(e)}>{this.state.genMethod === 0 ? "Edges" : "Position"}</Button>
                            </Col>
                        </Row> */}
                        <p className="mb-1">Amount of Colors in Palette</p>
                        <Row className="align-items-center mx-0">
                            <Col xs={10}><RangeSlider variant="danger" value={this.state.colorAmount} onChange={e => this.changeColorAmount(e, 3, 12)} min={3} max={12}/></Col>
                            <Col xs={2} className="p-0 p-md-1"><Form.Control type="number" value={this.state.colorAmount} onChange={e => this.changeColorAmount(e, 3, 12)}/></Col>
                        </Row>
                        <p className="mb-1">Reference Color Position: <b>{this.state.colorPosition + 1}</b></p>
                        <PositionSelector
                            amount={this.state.colorAmount}
                            position={this.state.colorPosition} 
                            changePosition={this.changePosition}
                        />
                    </Col>
                    {/* PALETTE CONFIGURATION */}
                    <Col xs={12} md={6} className="px-3 px-lg-5">
                        <h5 className="text-center">Palette Configuration</h5>
                        <hr/>
                        {/* Color Options */}
                        <Row className="align-items-center">
                            <Col xs={12}>
                                <p className="font-weight-bold text-center">Base Color</p>
                                <div className={styles.swatch} style={{backgroundColor: `hsl(${this.state.color1.h},${this.state.color1.s * 100}%,${this.state.color1.l * 100}%)`}} onClick={(e) => this.toggleColorPicker(e)}></div>
                                { this.state.displayColorPicker ? <div className={styles.colorPickerPopover}>
                                    <div className={styles.colorPickerCover} onClick={this.closeColorPicker}/>
                                    <ChromePicker 
                                        name="color1"
                                        className={styles.colorPicker}
                                        disableAlpha={true}
                                        color={this.state.color1}
                                        onChange={ this.changeColor }
                                    />
                                </div> : null }
                                <p className="text-center">{chroma(`hsl(${this.state.color1.h},${this.state.color1.s * 100}%,${this.state.color1.l * 100}%)`).hex()}</p>
                            </Col>
                        </Row>
                        {/* Shifting Options */}
                        <Row className="mt-3 mt-md-0">
                            <Col xs={12} style={{pointerEvents: this.state.displayColorPicker ? "none" : "auto"}}>
                                <Row className="align-items-center mx-0">
                                    <Col xs={4}><p className="mb-0">Hue Step</p></Col>
                                    <Col xs={6}><RangeSlider name="hueStep" variant="dark" value={this.state.hueStep} onChange={e => this.changeValue(e)} min={-180} max={180}/></Col>
                                    <Col xs={2} className="p-0 p-md-1"><Form.Control name="hueStep" type="number" value={this.state.hueStep} onChange={e => this.changeValueRange(e, -180, 180)}/></Col>
                                </Row>
                                <Row className="align-items-center mx-0">
                                    <Col xs={4}><p className="mb-0">Saturation Step</p></Col>
                                    <Col xs={6}><RangeSlider name="satStep" variant="dark" value={this.state.satStep} onChange={e => this.changeValue(e)} min={-50} max={50}/></Col>
                                    <Col xs={2} className="p-0 p-md-1"><Form.Control name="satStep" type="number" value={this.state.satStep} onChange={e => this.changeValueRange(e, -50, 50)}/></Col>
                                </Row>
                                <Row className="align-items-center mx-0">
                                    <Col xs={4}><p className="mb-0">Lightness Step</p></Col>
                                    <Col xs={6}><RangeSlider name="lightStep" variant="dark" value={this.state.lightStep} onChange={e => this.changeValue(e)} min={-50} max={50}/></Col>
                                    <Col xs={2} className="p-0 p-md-1"><Form.Control name="lightStep" type="number" value={this.state.lightStep} onChange={e => this.changeValueRange(e, -50, 50)}/></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="text-center">
                        <Button className="w-100 font-weight-bold" variant="success" onClick={(e) => this.generateColorRangePosition(e) }>Generate Palette</Button>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}

export default Palette;