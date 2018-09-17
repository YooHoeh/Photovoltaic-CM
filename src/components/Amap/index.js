import { Map, Polygon, Markers } from 'react-amap';
import { Icon, Row, Col, message } from "antd";
import { stringToPosition } from "../../utils/utils";
import styles from "./index.less"
import React from "react";
import IconFont from "../IconFont";


//图例
const Legend = () => {
  return (
    <div style={{
      position: "absolute", bottom: "28px", right: "28px", zIndex: "999999", padding: "8px", width: "160px", minWidth: "150px", height: "80px", minHeight: "50px", backgroundColor: "#2f65af", opacity: ".7", borderRadius: "15px", textAlign: "start"
    }}>
      <Row style={{ height: "50%", color: "#fff" }}>
        <Col span="12"><span style={{ color: "aqua", fontSize: "large", display: "inline-block", }}>●</span>运行中</Col>
        <Col span="12"><span style={{ color: "blueviolet", fontSize: "large", display: "inline-block", }}>●</span>建设中</Col>
      </Row>
      <Row style={{ height: "50%", color: "#fff" }}>
        <Col span="12"><span style={{ color: "chartreuse", fontSize: "large", display: "inline-block", }}>●</span>建设目标</Col>
        <Col span="12"><span style={{ color: "darkred", fontSize: "large", display: "inline-block", }}>●</span>告警</Col>
      </Row>
    </div>
  )
}
const Refresh = () => {
  return (
    <Icon
      type="retweet"
      theme="outlined"
      id="refreshBtn"
      style={{
        fontSize: "30px", color: "blue", position: "absolute", top: "28px", right: "28px", zIndex: "999999", padding: "8px", opacity: ".7"
      }} />
  )
}
class MapCard extends React.Component {


  constructor(props) {
    super(props);
    this.mapCenter = { longitude: 113.782939, latitude: 33.969338 };
    const marks = () => (
      this.props.station ?
        this.props.station.map((item, index) => ({
          position: stringToPosition(item.coordinate),
          siteType: item.status,
          siteName: item.name,
          siteID: item.id,
        })) : ''
    )
    this.state = {
      markers: marks()
    }

  }

  //添加站点Marks,根据状态返回不同标记
  renderMarkerLayout(extData) {
    switch (extData.siteType) {
      case "1":
        return <IconFont type="icon-ditu" style={{ fontSize: '18px', color: 'aqua' }} />
      case "2":
        return <IconFont type="icon-ditu" style={{ fontSize: '18px', color: 'blueviolet' }} />
      case "3":
        return <IconFont type="icon-ditu" style={{ fontSize: '18px', color: 'darkred' }} />
      case "0":
        return <IconFont type="icon-ditu" style={{ fontSize: '18px', color: 'chartreuse' }} />
    }
  }
  render() {
    //保存天气action
    const handleWeather = (weatherInfo) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/saveWeather',
        payload: weatherInfo
      });
    };
    //保存位置action
    const handleCity = (city) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/saveCity',
        payload: city
      });

    };
    //保存站点action
    const { dispatch } = this.props;
    const handleSite = (siteName, siteID) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/changeMapView',
        payload: "site"
      });
      dispatch({
        type: 'global/saveSite',
        payload: { siteName, siteID }
      });
    };
    const markersEvents = {
      created: (allMarkers) => {
        console.log('All Markers Instance Are Below');
        console.log(allMarkers);
      },
      click: (MapsOption, marker) => {
        const extData = marker.getExtData();
        const name = extData.siteName;
        const ID = extData.siteID;
        message.success("选中站点：" + name + "站点ID为" + ID)
        handleSite(name, ID)
        console.log("站点被点击")

      },
    }
    var polygons = [];
    var refreshbtn = document.getElementById("refreshBtn")
    const amapEvents = {
      created: (mapInstance) => {
        //绘制指定地区覆盖物
        mapInstance.plugin('AMap.DistrictSearch', function () {
          mapInstance.setDefaultCursor("pointer");
          addPlygons()
          // var polygons = mapInstance.getAllOverlays("polygon")
          console.log("pppp" + polygons)
          var refreshClick = () => {
            console.log("dianle ")
            remove();
            clickListener = AMap.event.addListener(mapInstance, "click", () => {
              mapInstance.setZoomAndCenter(7, [113.782939, 33.969338]);

            })
          }
          const ece = AMap.event.addDomListener(refreshbtn, "click", refreshClick());

          AMap.event.addListener(mapInstance, 'zoomend', function () {
            console.log('当前缩放级别：' + mapInstance.getZoom());

            mapInstance.getZoom() > 9 ?
              mapInstance.remove(polygons) :
              mapInstance.add(polygons)
          });

        });
        //获取系统使用者的所在位置用于显示默认信息
        mapInstance.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              console.log(result.city)
              handleCity(result.city)
              saveWeatherInfo(result.city);
            } else {
              console.log("地理信息获取失败")

            }
          })
        })
        //添加覆盖物
        function addPlygons() {
          drawCity('郑州市', '#f3deed');
          drawCity('开封市', '#fadeb9');
          drawCity('洛阳市', '#fadeb9');
          drawCity('平顶山市', '#c7e3b3');
          drawCity('安阳市', '#c5e4df');
          drawCity('鹤壁市', '#f3deed');
          drawCity('新乡市', '#d2ddf1');
          drawCity('焦作市', '#c5e4df');
          drawCity('濮阳市', '#c7e3b3');
          drawCity('许昌市', '#c5e4df');
          drawCity('漯河市', '#f3deed');
          drawCity('三门峡市', '#d2ddf1');
          drawCity('商丘市', '#d2ddf1');
          drawCity('周口市', '#c7e3b3');
          drawCity('驻马店市', '#c5e4df');
          drawCity('南阳市', '#f3deed');
          drawCity('信阳市', '#d2ddf1');
          drawCity('济源市', '#f3deed');
        }
        //添加覆盖物函数
        function drawCity(cname, fcolor) {
          // 创建行政区查询对象
          const district = new AMap.DistrictSearch({
            subdistrict: 2,
            // 返回行政区边界坐标等具体信息
            extensions: 'all',
            // 设置查询行政区级别为 城市 
            level: 'city'
          })
          district.search(cname, function (status, result) {
            const bounds = result.districtList[0].boundaries;

            if (bounds) {
              for (let i = 0, l = bounds.length; i < l; i++) {
                let polygon = new AMap.Polygon({
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
        //区域点击事件
        function cityClick(city) {

          saveWeatherInfo(city);
          handleCity(city)
          dispatch({
            type: 'global/changeMapView',
            payload: "city"
          });
          mapInstance.setCity(city)
          console.log("区域被点击")

        }
        //保存天气信息至global.state
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
        height: 530,
        // minHeight: 400
      }} >
      <Legend />
      <Refresh />
      <Map
        amapkey='3614606168564bdf7ccd53cf9d2b7669'
        version='1.4.2'
        resizeEnable='true'
        zoom='7'
        features={['bg', "point"]}
        zooms={[6, 18]}
        center={this.mapCenter}
        events={amapEvents}
      >
        <Markers
          markers={this.state.markers}
          render={this.renderMarkerLayout}
          events={markersEvents}
        // useCluster
        />
      </Map>
    </div >
  }
}
export default MapCard;
