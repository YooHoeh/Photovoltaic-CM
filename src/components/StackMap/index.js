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

class Stacked extends React.Component {
  render() {
    const data = [
      {
        State: "一月",
        "逆变器1": 25635,
        "逆变器2": 1890,
        "逆变器3": 9314
      },
      {
        State: "二月",
        "逆变器1": 30352,
        "逆变器2": 20439,
        "逆变器3": 10225
      },
      {
        State: "三月",
        "逆变器1": 38253,
        "逆变器2": 42538,
        "逆变器3": 15757
      },
      {
        State: "四月",
        "逆变器1": 51896,
        "逆变器2": 67358,
        "逆变器3": 18794
      },
      {
        State: "五月",
        "逆变器1": 72083,
        "逆变器2": 85640,
        "逆变器3": 22153
      },
      {
        State: "六月",
        "逆变器1": 25635,
        "逆变器2": 1890,
        "逆变器3": 9314
      },
      {
        State: "七月",
        "逆变器1": 30352,
        "逆变器2": 20439,
        "逆变器3": 10225
      },
      {
        State: "八月",
        "逆变器1": 38253,
        "逆变器2": 42538,
        "逆变器3": 15757
      },
      {
        State: "九月",
        "逆变器1": 51896,
        "逆变器2": 67358,
        "逆变器3": 18794
      },
      {
        State: "十月",
        "逆变器1": 72083,
        "逆变器2": 85640,
        "逆变器3": 22153
      },
      {
        State: "十一月",
        "逆变器1": 30352,
        "逆变器2": 20439,
        "逆变器3": 10225
      },
      {
        State: "十二月",
        "逆变器1": 38253,
        "逆变器2": 42538,
        "逆变器3": 15757
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["逆变器1", "逆变器2", "逆变器3"],
      key: "type",
      value: "独立分量",
      retains: ["State"] // 保留字段集，默认为除fields以外的所有字段
    });
    return (
      <div>
        <Chart height={490} data={dv} forceFit>
          <Legend />
          <Coord transpose />
          <Axis
            name="State"
            label={{
              offset: 12
            }}
          />
          <Axis name="发电量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="State*独立分量"
            color={"type"}
          />
        </Chart>
      </div>
    );
  }
}
export default Stacked;