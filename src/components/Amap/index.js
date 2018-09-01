import {
  Map
} from 'react-amap';
// const map = new AMap.Map('container', {
//   resizeEnable: true,
//   zoom: 7,
//   zooms: [4, 18],
//   center: [115.782939, 33.869338]
// });
// const addHeNan = () => {
//   AMap.service('AMap.DistrictSearch', function () {
//     var opts = {
//       subdistrict: 2,
//       extensions: 'all',
//       level: 'city'
//     };

//     //实例化DistrictSearch
//     district = new AMap.DistrictSearch(opts);
//     district.setLevel('district');
//     //d2ddf1，fadeb9，c7e3b3，c5e4df，f3deed
//     drawCity(district, '郑州市', '#f3deed');
//     drawCity(district, '开封市', '#fadeb9');
//     drawCity(district, '洛阳市', '#fadeb9');
//     drawCity(district, '平顶山市', '#c7e3b3');
//     drawCity(district, '安阳市', '#c5e4df');
//     drawCity(district, '鹤壁市', '#f3deed');
//     drawCity(district, '新乡市', '#d2ddf1');
//     drawCity(district, '焦作市', '#c5e4df');
//     drawCity(district, '濮阳市', '#c7e3b3');
//     drawCity(district, '许昌市', '#c5e4df');
//     drawCity(district, '漯河市', '#f3deed');
//     drawCity(district, '三门峡市', '#d2ddf1');
//     drawCity(district, '商丘市', '#d2ddf1');
//     drawCity(district, '周口市', '#c7e3b3');
//     drawCity(district, '驻马店市', '#c5e4df');
//     drawCity(district, '南阳市', '#f3deed');
//     drawCity(district, '信阳市', '#d2ddf1');
//     drawCity(district, '济源市', '#fadeb9');
//   });
// }
// const drawCity = (district, cname, fcolor) => {
//   district.search(cname, function (status, result) {
//     var bounds = result.districtList[0].boundaries;
//     var polygons = [];
//     if (bounds) {
//       for (var i = 0, l = bounds.length; i < l; i++) {
//         var polygon = new AMap.Polygon({
//           map: map,
//           strokeWeight: 1,
//           path: bounds[i],
//           fillOpacity: 0.5,
//           fillColor: fcolor,
//           strokeColor: '#555555'
//         });
//         polygons.push(polygon);
//       }
//     }
//   });
// }

class MapCard extends React.Component {
  // constructor() {
  //   super();

  // }

  // componentDidMount() {

  //   addHeNan();
  // }
  render() {

    return <div style = {
        {
          width: '100%',
          height: 509,
          minHeight: 509
        }
      } >
      <Map amapkey = {'3614606168564bdf7ccd53cf9d2b7669'}/>
    </div >
  }
}
export default MapCard;
