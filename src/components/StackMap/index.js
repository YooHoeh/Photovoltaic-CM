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
import DataSet from "@antv/data-set";
import React from "react";

class Stacked extends React.Component {
  render() {
    const data = this.props.data
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["逆变器1", "逆变器2", "逆变器3"],
      key: "type",
      value: "inverter",
      retains: ["time"] // 保留字段集，默认为除fields以外的所有字段
    });
    return (
      <div>
        <Chart height={490} data={dv} forceFit>
          <Legend />
          <Axis
            name="time"
            label={{
              offset: 12
            }}
          />
          <Axis name="发电量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="time*inverter"
            color={"type"}
          />
        </Chart>
      </div>
    );
  }
}
export default Stacked;