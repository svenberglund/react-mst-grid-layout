import React, { Component } from 'react';
import './App.css';
import ConsumerComponent from './components/consumerComponent';
import InvokerComponent from './components/invokerComponent';
import SubscriberGridLayout from './framework/components/grid';
import './worker/psWorkerRelayPublisher';
import './framework/message-relay/psSubscriber';
import GridElementColor from './components/gridElementColor';
import GridElementGauge from './components/gridElementGauge';
import GridElementChart from './components/gridElementChart';
import echarts from 'echarts';


GridElementColor.register("colorRender", GridElementColor);
GridElementGauge.register("gaugeRender", GridElementGauge);
GridElementChart.register("chartRender", GridElementChart);

// TODO: migrate echart styling to here (for gauge and chart)...
echarts.registerTheme('gauge_theme', {
    //backgroundColor: 'gray', //'#f4cccc',
    //color: 'red'
});




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <p>
         This is a <code>SubscriberGrid.js</code> demo!
        </p>
        <InvokerComponent/>
        </header>
        <MainComponent/>
      </div>
    );
  }
}

class MainComponent extends Component{
  render() {
    return (
      <div>
        <ConsumerComponent/>
        <SubscriberGridLayout 
          compactType="vertical" // default : none
          breakpoint="lg" // default : 'lg' = 12 columns
          rowHeight = {30} // default : 30
          gridStyle={{backgroundColor : 'LightSteelBlue'}}
          />
      </div>
    );
    }
}


export default App;
