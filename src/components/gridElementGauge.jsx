import GridElementSuper from "../framework/elements/gridElementSuper"
import React from "react";
import ReactEcharts from 'echarts-for-react';


// implement it with e-charts https://ecomfe.github.io/echarts-examples/public/editor.html?c=gauge

export default class GridElementGauge extends GridElementSuper{
  
    static renderElement(i, sm){

        function getOption(percentValue){

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
                        data: [{value: percentValue, name:  '完成率'}]
                    }
                ]
            };
        }

    return <div key={i} style={{backgroundColor : 'WhiteSmoke', borderRadius : '8px',
    borderWidth : '3px',
    borderColor : 'LightGray',
    borderStyle : 'solid'
    }}> 

    <ReactEcharts 
    option={getOption(sm.get('percent'))}
    notMerge={true}
    lazyUpdate={true}
    //showLoading={true}
    theme={"gauge_theme"}
    //onChartReady={this.onChartReadyCallback}
    //onEvents={EventsDict}
    //opts={} 
    />
    </div>;
  }
}