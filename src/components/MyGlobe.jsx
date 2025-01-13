import Globe from 'react-globe.gl';
import { useRef, useState, useEffect, useMemo } from 'react'
import image from '../assets/white.png'
import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';
import { interpolateGreens, interpolateReds, interpolatePurples, interpolateBlues, interpolatePlasma } from 'https://esm.sh/d3-scale-chromatic';
import pp from '../assets/data.json'
import p from '../assets/data_2.json'

function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}

function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

function MyGlobe(props) {
  const globeEl = useRef();
  const [windowSize, setWindowSize] = useState({
    width: vw(100) - 320,
    height: vh(85)
  });

  let colorScale = scaleSequentialSqrt(interpolateGreens);
  let getVal = feat => feat.properties.TINY;
  let getEn = feat => Math.max(0.1, Math.sqrt(+feat.energy_consumption)) * 0.002;
  let getIn = feat => Math.max(0.1, Math.sqrt(+feat.amount)) * 0.00004;
  let getCo = feat => Math.max(0.1, Math.sqrt(+feat.production)) * 0.00005;
  let getLi = feat => Math.max(0.1, Math.sqrt(+feat.expectancy)) * 0.07;

  const plasma_colors = ['#F8E125', '#FA9E3B', '#B02991', '#260591']
  const plasma_edges = ['rgba(248, 235, 127,0.5)', 'rgba(252, 192, 126,0.5)', 'rgba(175, 86, 154,0.5)', 'rgba(76, 56, 143,0.5)']
  const plasma_point = ['#FDE209', '#FF8909', '#FD0FC7', '#470FFF']

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    if (props.data.color == "green") {
      colorScale = scaleSequentialSqrt(interpolateGreens);
      if (props.data.set == "energy") {
        getVal = feat => feat.properties.TINY;
        colorScale.domain([0, 201563]);
      } else if (props.data.set == "life") {
        getVal = feat => feat.properties.MIN_ZOOM;
        colorScale.domain([0, 86.3724]);
      } else if (props.data.set == "corn") {
        getVal = feat => feat.properties.MIN_LABEL;
        colorScale.domain([0, 1208000000]);
      } else if (props.data.set == "internet") {
        getVal = feat => feat.properties.MAX_LABEL;
        colorScale.domain([0, 5016980000]);
      }
    }
    else if (props.data.color == "red") {
      colorScale = scaleSequentialSqrt(interpolateReds);
      if (props.data.set == "energy") {
        getVal = feat => feat.properties.TINY;
        colorScale.domain([0, 201563]);
      } else if (props.data.set == "life") {
        getVal = feat => feat.properties.MIN_ZOOM;
        colorScale.domain([0, 86.3724]);
      } else if (props.data.set == "corn") {
        getVal = feat => feat.properties.MIN_LABEL;
        colorScale.domain([0, 1208000000]);
      } else if (props.data.set == "internet") {
        getVal = feat => feat.properties.MAX_LABEL;
        colorScale.domain([0, 5016980000]);
      }
    } else if (props.data.color == "purple") {
      colorScale = scaleSequentialSqrt(interpolatePurples);
      if (props.data.set == "energy") {
        getVal = feat => feat.properties.TINY;
        colorScale.domain([0, 201563]);
      } else if (props.data.set == "life") {
        getVal = feat => feat.properties.MIN_ZOOM;
        colorScale.domain([0, 86.3724]);
      } else if (props.data.set == "corn") {
        getVal = feat => feat.properties.MIN_LABEL;
        colorScale.domain([0, 1208000000]);
      } else if (props.data.set == "internet") {
        getVal = feat => feat.properties.MAX_LABEL;
        colorScale.domain([0, 5016980000]);
      }
    } else if (props.data.color == "blue") {
      colorScale = scaleSequentialSqrt(interpolateBlues);
      if (props.data.set == "energy") {
        getVal = feat => feat.properties.TINY;
        colorScale.domain([0, 201563]);
      } else if (props.data.set == "life") {
        getVal = feat => feat.properties.MIN_ZOOM;
        colorScale.domain([0, 86.3724]);
      } else if (props.data.set == "corn") {
        getVal = feat => feat.properties.MIN_LABEL;
        colorScale.domain([0, 1208000000]);
      } else if (props.data.set == "internet") {
        getVal = feat => feat.properties.MAX_LABEL;
        colorScale.domain([0, 5016980000]);
      }
    } else if (props.data.color == "plasma") {
      colorScale = scaleSequentialSqrt(interpolatePlasma);
      if (props.data.set == "energy") {
        getVal = feat => feat.properties.TINY;
        colorScale.domain([0, 201563]);
      } else if (props.data.set == "life") {
        getVal = feat => feat.properties.MIN_ZOOM;
        colorScale.domain([0, 86.3724]);
      } else if (props.data.set == "corn") {
        getVal = feat => feat.properties.MIN_LABEL;
        colorScale.domain([0, 1208000000]);
      } else if (props.data.set == "internet") {
        getVal = feat => feat.properties.MAX_LABEL;
        colorScale.domain([0, 5016980000]);
      }
    }
    console.log(props.data.style)

    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;

    globeEl.current.pointOfView({ altitude: 2 }, 1000);

  });

  useEffect(() => {

    const handleResize = () => {
      setWindowSize({
        width: vw(100) - 320,
        height: vh(80)
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (props.data.style == "color") {
    console.log(vw(60))
    return (
      <div key="color">
        <Globe
          globeImageUrl={image}
          width={windowSize.width}
          height={windowSize.height}
          animateIn={true}
          autoRotate={true}
          ref={globeEl}
          atmosphereAltitude={0.25}

          hexPolygonResolution={10}
          backgroundColor='white'
          polygonsData={pp.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
          polygonAltitude={0.005}
          polygonCapColor={d => colorScale(getVal(d))}
          polygonSideColor={() => 'rgb(255, 255, 255)'}
          polygonStrokeColor={() => 'rgb(255, 255, 255)'}
          polygonLabel={({ properties: d }) => props.data.set == "energy" ?
            `
          <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
          <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
          <b style="color:blue;">KilloWatt Hours: <i>${(Math.round(+d.TINY)).toLocaleString()}</i></b>
      `
            : props.data.set == "life" ?
              `
      <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
      <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
      <b style="color:blue;">Years: <i>${(Math.round(d.MIN_ZOOM)
              )}</i></b>
  `
              : props.data.set == "corn" ?
                `
  <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
  <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
  <b style="color:blue;">Tons: <i>${(Math.round(d.MIN_LABEL).toLocaleString()
                )}</i></b>
`
                :
                `
<b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
<b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
<b style="color:blue;">People: <i>${(Math.round(d.MAX_LABEL).toLocaleString()
                )}</i></b>
`
          }
        ></Globe>
      </div>
    )

  } else if (props.data.style == "bar") {
    return (
      <div key="bar">
        <Globe
          globeImageUrl={image}
          width={windowSize.width}
          height={windowSize.height}
          animateIn={true}
          autoRotate={true}
          ref={globeEl}

          hexPolygonResolution={10}
          backgroundColor='white'
          polygonsData={pp.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
          polygonAltitude={0.005}
          polygonCapColor={() => props.data.color == "green" ? 'rgb(62, 165, 89)' : props.data.color == "red" ? '#e93a2d' :
            props.data.color == "purple" ? '#6E5AA8' : props.data.color == "blue" ? '#2C7CBA' : plasma_colors[Math.floor(Math.random() * plasma_colors.length)]}
          polygonSideColor={() => 'rgb(255, 255, 255)'}
          polygonStrokeColor={() => 'rgb(255, 255, 255)'}
          polygonLabel={({ properties: d }) => props.data.set == "energy" ?
            `
            <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
            <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
            <b style="color:blue;">KilloWatt Hours: <i>${(Math.round(+d.TINY)).toLocaleString()}</i></b>
        `
            : props.data.set == "life" ?
              `
        <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
        <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
        <b style="color:blue;">Years: <i>${(Math.round(d.MIN_ZOOM)
              )}</i></b>
    `
              : props.data.set == "corn" ?
                `
    <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
    <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
    <b style="color:blue;">Tons: <i>${(Math.round(d.MIN_LABEL).toLocaleString()
                )}</i></b>
`
                :
                `
<b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
<b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
<b style="color:blue;">People: <i>${(Math.round(d.MAX_LABEL).toLocaleString()
                )}</i></b>
`
          }

          pointsData={p["data"]}
          pointAltitude={(d) => props.data.set == "energy" ? getEn(d) : props.data.set == "internet" ? getIn(d) : props.data.set == "corn" ? getCo(d) : getLi(d)}
          pointColor={() => props.data.color == "green" ? 'rgb(0, 255, 68)' : props.data.color == "red" ?
            'rgb(255, 21, 0)' : props.data.color == "purple" ? 'rgb(140, 0, 255)' : props.data.color == "blue" ? 'rgb(4, 0, 255)' : plasma_point[Math.floor(Math.random() * plasma_colors.length)]}
          pointLat="latitude"
          pointLng="longitude"
        ></Globe>
      </div>
    )
  } else if (props.data.style == "polygon") {
    return (
      <div key="polygon">
        <Globe
          globeImageUrl={image}
          width={windowSize.width}
          height={windowSize.height}
          animateIn={true}
          autoRotate={true}
          ref={globeEl}

          hexPolygonResolution={10}
          backgroundColor='white'
          polygonsData={pp.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
          polygonAltitude={(d) => Math.max(0.1, props.data.set == "energy" ? Math.sqrt(+d.properties.TINY) * .003 : props.data.set == "life" ? Math.sqrt(+d.properties.MIN_ZOOM) * .07 : props.data.set == "corn" ? Math.max(0.1, Math.sqrt(+d.properties.MIN_LABEL)) * 0.00005 : Math.max(0.1, Math.sqrt(+d.properties.MAX_LABEL)) * 0.00004)}
          polygonCapColor={() => props.data.color == "green" ? 'rgb(62, 165, 89)' : props.data.color == "red" ? '#e93a2d' :
            props.data.color == "purple" ? '#6E5AA8' : props.data.color == "blue" ? '#2C7CBA' : plasma_colors[Math.floor(Math.random() * plasma_colors.length)]}
          polygonSideColor={() => props.data.color == "green" ? 'rgba(128, 165, 138, 0.5)' : props.data.color == "red" ?
            'rgba(215, 121, 113,0.5)' : props.data.color == "purple" ? 'rgba(111, 98, 146,0.5)' : props.data.color == "blue" ? 'rgba(94, 145, 184,0.58)' : plasma_edges[Math.floor(Math.random() * plasma_colors.length)]}
          polygonStrokeColor={() => 'rgb(255, 255, 255)'}
          polygonLabel={({ properties: d }) => props.data.set == "energy" ?
            `
            <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
            <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
            <b style="color:blue;">KilloWatt Hours: <i>${(Math.round(+d.TINY)).toLocaleString()}</i></b>
        `
            : props.data.set == "life" ?
              `
        <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
        <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
        <b style="color:blue;">Years: <i>${(Math.round(d.MIN_ZOOM)
              )}</i></b>
    `
              : props.data.set == "corn" ?
                `
    <b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
    <b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
    <b style="color:blue;">Tons: <i>${(Math.round(d.MIN_LABEL).toLocaleString()
                )}</i></b>
`
                :
                `
<b style="color:blue;">${d.ADMIN} (${d.ISO_A2})</b> <br />
<b style="color:blue;">Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i></b> </br>
<b style="color:blue;">People: <i>${(Math.round(d.MAX_LABEL).toLocaleString()
                )}</i></b>
`
          }
        ></Globe></div>
    )
  }
}

export default MyGlobe