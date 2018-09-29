import GridElementSuper from "./gridElementSuper"
import React from "react";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

 
echarts.registerTheme('my_theme', {
    backgroundColor: 'gray', //'#f4cccc',
    color: 'red'
  });

// implement it with e-charts https://ecomfe.github.io/echarts-examples/public/editor.html?c=gauge

export default class GridElementGauge extends GridElementSuper{


    static getOption(l){

        return {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: l.subscriptionMap.get('percent'), name:  '完成率'}]
                }
            ]
        };
    }
  
    static renderElement(i, l){

    return <div key={i} style={{backgroundColor : 'CornflowerBlue', borderRadius : '8px'}}> 

    <ReactEcharts 
    option={GridElementGauge.getOption(l)}
    notMerge={true}
    lazyUpdate={true}
    //showLoading={true}
    theme={"theme_name"}
    //onChartReady={this.onChartReadyCallback}
    //onEvents={EventsDict}
    //opts={} 
    />
    </div>;
  }
}