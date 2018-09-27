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
    const data = this.props.data;

    const cols = {
      '发电量': {
      },
      time: {
        type: 'cat',
        range: [0, 1],

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
