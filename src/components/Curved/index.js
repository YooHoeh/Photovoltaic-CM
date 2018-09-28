import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

class Basic extends React.Component {
  render() {
    const origin = this.props.data;
    const data = [];
    origin.map(item => {
      data.push({
        time: item.time,
        发电量: parseFloat(item.发电量)
      })
    })
    const cols = {
      '发电量': {
      },
      time: {

      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="time" />
          <Axis name='发电量' />
          <Tooltip
          />
          <Geom type="line" position="time*发电量" size={2} shape={"smooth"} />
          <Geom
            type="point"
            position="time*发电量"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Basic;
