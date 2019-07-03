import React, { Component } from 'react';
import './App.css';
import { BrowserView, isBrowser } from "react-device-detect"; // device adaption

// some grid element implementations use echarts, we import it application wide
import echarts from 'echarts';

// prime react css for making beautiful buttons and stuff in the demo
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Importing the RMGL framework
import RMGL from "./api"

// The actual demo or 'implementation'
import ConsumerComponent from './components/consumerComponent';
import InvokerComponent from './components/invokerComponent';
import GridElementColor from './grid-elements/gridElementColor';
import GridElementGauge from './grid-elements/gridElementGauge';
import GridElementChart from './grid-elements/gridElementChart';

// This is tha guy that actually publishes data to the demo
import './worker/psWorkerRelayPublisher';

// Registering the grid-element rendering classes
GridElementColor.register("colorRender", GridElementColor);
GridElementGauge.register("gaugeRender", GridElementGauge);
GridElementChart.register("chartRender", GridElementChart);

/*
  TODO: For the elements built on echart (gauge and chart) we can use echarts built in styiling framework
  We can migrate the styles to here and make them available applciation wide, look into it...
*/
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
            This is a <a href="https://github.com/svenberglund/react-mst-grid-layout"><code>react-mst-grid-layout.js</code></a> demo!
            <br></br>
            The elements in the grid can be dragged and resized while consuming data.
        </p>
          <InvokerComponent />
        </header>
        <MainComponent />
      </div>
    );
  }
}

class MainComponent extends Component{

  grid = RMGL.mstGrids.getGrid("defaultGrid");

  componentWillMount(){
    let subscriptionMap = { // Initial values of the subscription map. All renderClasses use the same format. 
      rgb:'{"rgbH": 20,"rgbL":200}', 
      percent: 50,
      series: '[0,0,0,0,0,0,0,0,0,0]'
    };

    let layoutMap = isBrowser ? { i: '0', x: 0, y: 0, w: 4, h: 3}: {i:'0', x:0, y:0, w:12, h:3}; // we adapt the layouts for tablets/mobiles
    this.grid.addMstGridItem( "colorRender", layoutMap, subscriptionMap);
    layoutMap = isBrowser ? { i: '1', x: 4, y: 0, w: 3, h: 9} : {i:'1', x:7, y:3, w:5, h:8,};
    this.grid.addMstGridItem( "chartRender", layoutMap, subscriptionMap );
    layoutMap = isBrowser ? { i: '2', x: 0, y: 3, w: 2, h: 6}: {i:'2', x:0, y:3, w:7, h:6};
    this.grid.addMstGridItem( "gaugeRender", layoutMap, subscriptionMap );
    layoutMap = isBrowser ? { i: '3', x: 7, y: 0, w: 3, h: 7}: {i:'3', x:0, y:9, w:7, h:7};
    this.grid.addMstGridItem( "gaugeRender", layoutMap, subscriptionMap );
  }

  render() {
    return (
      <div>
        <BrowserView>
          <ConsumerComponent />
        </BrowserView> 
        <RMGL.MstGridLayout
          compactType="vertical" // default : none
          breakpoint="lg" // default : 'lg' = 12 columns
          rowHeight={30} // default : 30
          gridStyle={{ backgroundColor: 'LightSteelBlue' }}
        />
      </div>
    );
  }
}

export default App;
