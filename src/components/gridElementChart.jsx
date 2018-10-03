import GridElementSuper from "../framework/elements/gridElementSuper"
import React from "react";
import ReactEcharts from 'echarts-for-react';


export default class GridElementChart extends GridElementSuper {


    static renderElement(i, l) {

        function getOption(l) {

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

        let rgbMap = JSON.parse(l.subscriptionMap.get('rgb'));

        return <div key={i} style={{
            backgroundColor: `rgb(${rgbMap['rgbH']},75,${rgbMap['rgbL']})`,
            borderRadius: '8px',
            borderWidth: '3px',
            borderColor: 'LightGray',
            borderStyle: 'solid'
        }}>

            <ReactEcharts
                option={getOption(l)}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
            /></div>;
    }
}