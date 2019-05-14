import MGL from 'react-mst-grid-layout';
import React from "react";
import ReactEcharts from 'echarts-for-react';


/*
    Implementation of grid element built on eCharts (Gauge)
    https://ecomfe.github.io/echarts-examples/public/index.html
    https://www.npmjs.com/package/echarts-for-react
*/
export default class GridElementGauge{
    // extends MGL.GridElementSuper{
  
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
    theme={"gauge_theme"}
    />
    </div>;
  }

  static register(name_, class_) { 
    return MGL.GridElementSuper.register(name_,class_);
  }
}