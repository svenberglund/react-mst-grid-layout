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
import {subscriberGrid} from './framework/models/subscriberGrid';

// prime react css
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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

  componentWillMount(){
  
    let subscriptionMap = { // Initial values of the subscription map. All renderClasses uses the same format. 
      int: 0, 
      rgb:'{"rgbH": 20,"rgbL":200}', 
      percent: 50,
      series: '[0,0,0,0,0,0,0,0,0,0]'
    };
    let layoutMap = { i: '0', x: 0, y: 0, w: 4, h: 3};
    subscriberGrid.addSubscriberGridItem( `first`, "colorRender", layoutMap, subscriptionMap);
    layoutMap = { i: '1', x: 4, y: 0, w: 3, h: 9};
    subscriberGrid.addSubscriberGridItem( `second`, "chartRender", layoutMap, subscriptionMap );
    layoutMap = { i: '2', x: 0, y: 3, w: 2, h: 6};
    subscriberGrid.addSubscriberGridItem( `third`, "gaugeRender", layoutMap, subscriptionMap );
    layoutMap = { i: '3', x: 7, y: 0, w: 3, h: 7};
    subscriberGrid.addSubscriberGridItem( `fourth`, "gaugeRender", layoutMap, subscriptionMap );
  }


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
