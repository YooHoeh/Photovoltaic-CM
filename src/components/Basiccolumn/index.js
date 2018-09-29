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

class Basiccolumn extends React.Component {
  render() {
    const data = this.props.data;

    const cols = {
      value: {
        tickInterval: 20
      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="time" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="time*value" />
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;

