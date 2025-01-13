import './Page.css'
import { useState, useEffect } from 'react'
import MyGlobe from './MyGlobe'
import ScaleIndex from './ScaleIndex'

function Page() {
    const [dataSet, setDataSet] = useState([true, false, false, false])
    const [color, setColor] = useState([true, false, false, false, false])
    const [style, setStyle] = useState([true, false, false])
    const [title, setTitle] = useState("Energy use per person, 2021")
    const [link, setLink] = useState("https://ourworldindata.org/energy")

    useEffect(() => {
        setDataSet(dataSet)
        setColor(color)
        setStyle(style)

    }, []);

    const selectDataSet = (n) => {
        setTitle(() => {
            if (n == 0) {
                setLink("https://ourworldindata.org/energy")
                return "Energy use per Person, 2021"
            } else if (n == 1) {
                setLink("https://ourworldindata.org/internet")
                return "Internet Users, 2021"
            } else if (n == 2) {
                setLink("https://ourworldindata.org/crop-yields")
                return "Corn: Yield, 2021"
            } else if (n == 3) {
                setLink("https://ourworldindata.org/life-expectancy")
                return "Life expectancy, 2021"
            }
        });
        setDataSet((prevState) => {
            const newState = prevState.map((value, index) => {
                return value = index == n ? true : false
            });
            return newState;
        });
    }

    const selectColor = (n) => {
        setColor((prevState) => {
            const newState = prevState.map((value, index) => {
                return value = index == n ? true : false
            });
            return newState;
        });
    }

    const selectStyle = (n) => {
        setStyle((prevState) => {
            const newState = prevState.map((value, index) => {
                return value = index == n ? true : false
            });
            return newState;
        });
    }

    return (
        <>
            <div className={"container-div"}>
                <div className={"top-div"}>
                    <nav className={"dataset-div"}>
                        <li className={dataSet[0] ? "selected-dataset" : "unselected-dataset"} onClick={() => selectDataSet(0)}><div className={"inner-div"}>Energy Consumption</div></li>
                        <li className={dataSet[1] ? "selected-dataset" : "unselected-dataset"} onClick={() => selectDataSet(1)}><div className={"inner-div"}>Internet Users</div></li>
                        <li className={dataSet[2] ? "selected-dataset" : "unselected-dataset"} onClick={() => selectDataSet(2)}><div className={"inner-div"}>Maize Production</div></li>
                        <li className={dataSet[3] ? "selected-dataset" : "unselected-dataset"} onClick={() => selectDataSet(3)}><div className={"inner-div"}>Life Expectancy</div></li>
                    </nav>
                        <h3 className={"title"}> <a href={link}>{title}</a>  </h3>
                        <ScaleIndex data={{
                            set: dataSet[0] ? "energy" : dataSet[1] ? "internet" : dataSet[2] ? "corn" : "life",
                            color: color[0] ? "green" : color[1] ? "red" : color[2] ? "purple" : color[3] ? "blue" : "plasma",
                            style: style[0]
                        }}></ScaleIndex>
                </div>
                <div className={"bottom-div"}>
                    <div className={"color-div"}>
                        <nav>
                            <li className={color[0] ? "selected-color" : "unselected-color"} style={{ backgroundColor: '#3EA559' }} onClick={() => selectColor(0)}></li>
                            <li className={color[1] ? "selected-color" : "unselected-color"} style={{ backgroundColor: '#E93A2D' }} onClick={() => selectColor(1)}></li>
                            <li className={color[2] ? "selected-color" : "unselected-color"} style={{ backgroundColor: '#6E5AA8' }} onClick={() => selectColor(2)}></li>
                            <li className={color[3] ? "selected-color" : "unselected-color"} style={{ backgroundColor: '#2C7CBA' }} onClick={() => selectColor(3)}></li>
                            <li className={color[4] ? "selected-color" : "unselected-color"} style={{ backgroundImage: 'linear-gradient(to bottom right, #F8E125, #FA9E3B, #B02991, #260591)' }} onClick={() => selectColor(4)}></li>
                        </nav>
                    </div>
                    <div className={"globe-div"}>
                        <MyGlobe data={{
                            set: dataSet[0] ? "energy" : dataSet[1] ? "internet" : dataSet[2] ? "corn" : "life",
                            color: color[0] ? "green" : color[1] ? "red" : color[2] ? "purple" : color[3] ? "blue" : "plasma",
                            style: style[0] ? "color" : style[1] ? "bar" : "polygon"
                        }}></MyGlobe>
                    </div>
                    <div className={"data-style-div"}>
                        <nav>
                            <li className={style[0] ? "selected-style" : "unselected-style"} onClick={() => selectStyle(0)}><div className={"inner-div"}>Color Scale</div></li>
                            <li className={style[1] ? "selected-style" : "unselected-style"} onClick={() => selectStyle(1)}><div className={"inner-div"}>Bar Elevation</div></li>
                            <li className={style[2] ? "selected-style" : "unselected-style"} onClick={() => selectStyle(2)}><div className={"inner-div"}>Polygon Altitude</div></li>
                        </nav>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Page