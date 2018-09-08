const cityList = [
    { name: "郑州市", code: 410100 },
    { name: "开封市", code: 410200 },
    { name: "洛阳市", code: 410300 },
    { name: "平顶山市", code: 410400 },
    { name: "安阳市", code: 410500 },
    { name: "鹤壁市", code: 410600 },
    { name: "新乡市", code: 410700 },
    { name: "焦作市", code: 410800 },
    { name: "濮阳市", code: 410900 },
    { name: "许昌市", code: 411000 },
    { name: "漯河市", code: 411100 },
    { name: "三门峡市", code: 411200 },
    { name: "商丘市", code: 411400 },
    { name: "周口市", code: 411600 },
    { name: "驻马店市", code: 411700 },
    { name: "南阳市", code: 411300 },
    { name: "信阳市", code: 411500 },
    { name: "济源市", code: 411800 },
]
export const cityNameToCode = (name) => {
    cityList.map((i) => {
        if (name == i.name) {
            console.log(i.code)
            return i.code;
        }
    })
}