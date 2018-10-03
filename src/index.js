import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './worker/psWorkerRelayPublisher';
import './framework/message-relay/psSubscriber';
import GridElementColor from './components/gridElementColor';
import GridElementGauge from './components/gridElementGauge';
import GridElementChart from './components/gridElementChart';
import echarts from 'echarts';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
GridElementColor.register("colorRender", GridElementColor);
GridElementGauge.register("gaugeRender", GridElementGauge);
GridElementChart.register("chartRender", GridElementChart);

// TODO: migrate echart styling to here (for gauge and chart)
echarts.registerTheme('gauge_theme', {
    //backgroundColor: 'gray', //'#f4cccc',
    //color: 'red'
});