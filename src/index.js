// import scss
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

// import libs
import $ from 'jquery';
import 'bootstrap';
import echarts from 'echarts';

// import js
import Map from './lib/map';

if (process.env.NODE_ENV !== 'production') {
    console.warn('Looks like we are in development mode!');
}

// testing jquery and javascript
console.log($('h1').text());
console.log(document.querySelector('h1').innerText);

// initial map
const lat = 24.799448;
const lng = 120.979021;
const zoom = 14;
const map = new Map();

window.onload = () => {
    map.init(lat, lng, zoom);
};

// Search Event
$('#btnMarker').click(() => searchLocation());
$('#txtAdd').keypress(e => {
    if (e.keyCode === 13) searchLocation();
});

const myChart = echarts.init(document.getElementById('radarChart'));

myChart.setOption({
    // title: {
    //     text: '幸福指數六角圖',
    //     textStyle: {
    //         fontSize: '24',
    //     },
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        x: 'center',
        data: ['環境', '安全', '交通', '教育', '便利']
    },
    textStyle: {
        color: '#000',
        fontSize: '20',
    },
    radar: [
        {
            indicator: [
                { text: '環境', max: 100 },
                { text: '安全', max: 100 },
                { text: '交通', max: 100 },
                { text: '教育', max: 100 },
                { text: '便利', max: 100 },
            ],
            // center: ['25%','40%'],
            // radius: 80
        },
    ],
    series: [
        {
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: [
                {
                    value: [60, 73, 85, 40, 80, 56],
                    name: '某软件'
                }
            ]
        },
    ],
});

function searchLocation() {
    const addr = $('#txtAdd').val();
    if (addr === '') return;
    map.search(addr, result => {
        const { status, location, lat, lng } = result;

        if (!status) return;

        // 定位地址
        map.addMarker(location, 18);

        // 設定經緯度標籤
        $('#txtLat').text(`Lat：${lat}`);
        $('#txtLng').text(`Lng：${lng}`);
    });
}