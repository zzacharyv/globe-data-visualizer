import { useState, useEffect } from 'react'
import './ScaleIndex.css'
import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';

import { interpolateGreens, interpolateReds, interpolatePurples, interpolateBlues, interpolatePlasma } from 'https://esm.sh/d3-scale-chromatic';

function ScaleIndex(props) {
    if (props.data.style == true) {
        const size = 7
        const [max, setMax] = useState(201563)
        const [units, setUnits] = useState("killowatt hours")
        let colorScale = scaleSequentialSqrt(interpolateGreens);
        colorScale.domain([0, 201563]);
        const [color, setColor] = useState(['', '', '', '', '', '', '', ''])

        useEffect(() => {
            if (props.data.color == "green") {
                colorScale = scaleSequentialSqrt(interpolateGreens);
                colorScale.domain([0, max]);

            } else if (props.data.color == "red") {
                colorScale = scaleSequentialSqrt(interpolateReds);
                colorScale.domain([0, max]);
            } else if (props.data.color == "purple") {
                colorScale = scaleSequentialSqrt(interpolatePurples);
                colorScale.domain([0, max]);
            } else if (props.data.color == "blue") {
                colorScale = scaleSequentialSqrt(interpolateBlues);
                colorScale.domain([0, max]);
            } else if (props.data.color == "plasma") {
                colorScale = scaleSequentialSqrt(interpolatePlasma);
                colorScale.domain([0, max]);
            }
            setColor((prevState) => {
                const newState = prevState.map((value, index) => {
                    var poop = colorScale((index) * (max / size))
                    return value = poop
                });
                return newState;
            });

            setUnits(() => {
                if (props.data.set == "energy") return "KilloWatt Hours"
                if (props.data.set == "internet") return "People"
                if (props.data.set == "corn") return "Tons"
                if (props.data.set == "life") return "Years"
            });

            setMax(() => {
                if (props.data.set == "energy") return 201563
                if (props.data.set == "internet") return 5016980000
                if (props.data.set == "corn") return 1208000000
                if (props.data.set == "life") return 86.3724
            });

        }, [props]);
        return (
            <><div className={"container"}>
                <div className={"bottom"}>
                    <div className={"num"}>{(0).toLocaleString()}</div>
                    <div className={"num"}>{(Math.trunc(max / size)).toLocaleString()}</div>
                    <div className={"num"}>{(Math.trunc(max / size) * 2).toLocaleString()}</div>
                    <div className={"num"}>{(Math.trunc(max / size) * 3).toLocaleString()}</div>
                    <div className={"num"}>{(Math.trunc(max / size) * 4).toLocaleString()}</div>
                    <div className={"num"}>{(Math.trunc(max / size) * 5).toLocaleString()}</div>
                    <div className={"num"}>{(Math.trunc(max / size) * 6).toLocaleString()}</div>
                    <div className={"num"}>{(Math.trunc(max / size) * 7).toLocaleString()}</div>
                </div>
                <div className={"top"}>
                    <div className={"unit"} style={{ backgroundColor: color[0], borderLeft: '1px solid' }}></div>
                    <div className={"unit"} style={{ backgroundColor: color[1] }}></div>
                    <div className={"unit"} style={{ backgroundColor: color[2] }}></div>
                    <div className={"unit"} style={{ backgroundColor: color[3] }}></div>
                    <div className={"unit"} style={{ backgroundColor: color[4] }}></div>
                    <div className={"unit"} style={{ backgroundColor: color[5] }}></div>
                    <div className={"unit"} style={{ backgroundColor: color[6] }}></div>
                    <div className={"unit"} style={{ backgroundColor: color[7], borderRight: '1px solid' }}></div>
                </div>
                <div className={"label"}>
                    {units}
                </div>

            </div>
            </>
        )
    } else return (
        <></>
    )
}

export default ScaleIndex