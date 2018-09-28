import GridElementSuper from "./gridElementSuper"
import React from "react";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

 
echarts.registerTheme('my_theme', {
    backgroundColor: '#f4cccc'
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

    return <div key={i}> <ReactEcharts 
    option={GridElementChart.getOption(l)}
    notMerge={true}
    lazyUpdate={true}
    theme={"theme_name"}
    /></div>;
  }
}