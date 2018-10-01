import GridElementSuper from "./gridElementSuper"
import React from "react";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

 
echarts.registerTheme('my_theme', {
    backgroundColor: 'gray',//'#f4cccc',
    borderRadius: '8px'
  });

export default class GridElementChart extends GridElementSuper{


    static getOption(l){

        return {

            xAxis: {
                type: 'category', // '业务指标''完成率'
                data: ['业', '务', '指', '标', '完', '成', '率', '业', '务', '指']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: JSON.parse(l.subscriptionMap.get('series')),
                type: 'line'
            }]
        };
    }

    static renderElement(i, l){
    let rgbMap = JSON.parse(l.subscriptionMap.get('rgb'));
    
    return <div key={i} style={{backgroundColor :`rgb(${rgbMap['rgbH']},75,${rgbMap['rgbL']})`, 
    borderRadius : '8px',
    borderWidth : '3px',
    borderColor : 'LightGray',
    borderStyle : 'solid'
    }}> 
    
    <ReactEcharts 
    option={GridElementChart.getOption(l)}
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
    /></div>;
  }
}