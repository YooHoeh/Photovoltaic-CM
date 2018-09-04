import { Map, Polygon } from 'react-amap';
import { Icon } from "antd";
class MapCard extends React.Component {


  constructor() {
    super();
    this.mapCenter = { longitude: 113.782939, latitude: 33.869338 };

  }

  // componentDidMount() {

  // }
  render() {
    const handleWeather = (weatherInfo) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/saveWeather',
        payload: weatherInfo
      });
    };
    const handleCity = (city) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/saveCity',
        payload: city
      });
    };

    const amapEvents = {
      created: (mapInstance) => {
        mapInstance.plugin('AMap.DistrictSearch', function () {

          // 创建行政区查询对象
          var district = new AMap.DistrictSearch({
            subdistrict: 2,
            // 返回行政区边界坐标等具体信息
            extensions: 'all',
            // 设置查询行政区级别为 城市 
            level: 'city'
          })

          drawCity(district, '郑州市', '#f3deed');
          drawCity(district, '开封市', '#fadeb9');
          drawCity(district, '洛阳市', '#fadeb9');
          drawCity(district, '平顶山市', '#c7e3b3');
          drawCity(district, '安阳市', '#c5e4df');
          drawCity(district, '鹤壁市', '#f3deed');
          drawCity(district, '新乡市', '#d2ddf1');
          drawCity(district, '焦作市', '#c5e4df');
          drawCity(district, '濮阳市', '#c7e3b3');
          drawCity(district, '许昌市', '#c5e4df');
          drawCity(district, '漯河市', '#f3deed');
          drawCity(district, '三门峡市', '#d2ddf1');
          drawCity(district, '商丘市', '#d2ddf1');
          drawCity(district, '周口市', '#c7e3b3');
          drawCity(district, '驻马店市', '#c5e4df');
          drawCity(district, '南阳市', '#f3deed');
          drawCity(district, '信阳市', '#d2ddf1');
          drawCity(district, '济源市', '#fadeb9');
        });
        function drawCity(district, cname, fcolor) {
          district.search(cname, function (status, result) {
            var bounds = result.districtList[0].boundaries;
            var polygons = [];
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                var polygon = new AMap.Polygon({
                  map: mapInstance,
                  strokeWeight: 1,
                  path: bounds[i],
                  fillOpacity: 0.5,
                  fillColor: fcolor,
                  strokeColor: '#555555',
                  ciytName: "123"
                });
                polygon.on('click', () => { cityClick(cname) })
                polygon.on('mouseover', () => { })
                polygons.push(polygon);
              }
              // 地图位置自适应，是所有覆盖物都能显示
              // mapInstance.setFitView()
            }
          });
        }
        function cityClick(city) {
          saveWeatherInfo(city);
          handleCity(city)

        }
        function saveWeatherInfo(cname) {
          mapInstance.plugin('AMap.Weather', function () {
            var weather = new AMap.Weather();
            //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
            weather.getLive(cname, function (err, data) {
              if (!err) {
                // var str = [];
                // str.push('城市/区：' + data.city);
                // str.push('天气：' + data.weather);
                // str.push('温度：' + data.temperature + '℃');
                // str.push('风向：' + data.windDirection);
                // str.push('风力：' + data.windPower + ' 级');
                // str.push('空气湿度：' + data.humidity);
                // str.push('发布时间：' + data.reportTime);
                const str = {
                  "城市": data.city,
                  "天气": data.weather,
                  "温度": data.temperature + '℃',
                  "风向": data.windDirection,
                  "风力": data.windPower + ' 级',
                  "空气湿度": data.humidity,
                  "发布时间": data.reportTime
                };

                handleWeather(str)
              }
            })
          })
        }
      }
    }
    return <div style={
      {
        width: '100%',
        height: 480,
        // minHeight: 400
      }
    } >
      <Map
        amapkey='3614606168564bdf7ccd53cf9d2b7669'
        version='1.4.2'
        resizeEnable='true'
        zoom='7.1'
        features={['bg', "point"]}
        zooms={[6, 18]}
        center={this.mapCenter}
        events={amapEvents}
      >
      </Map>
    </div >
  }
}
export default MapCard;
