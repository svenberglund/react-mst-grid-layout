import GridElementSuper from "../framework/elements/gridElementSuper"
import React from "react";
import ReactEcharts from 'echarts-for-react';


/*
    Implementation of grid element built on eCharts (Line Chart)
    https://ecomfe.github.io/echarts-examples/public/index.html
    https://www.npmjs.com/package/echarts-for-react

*/
export default class GridElementChart extends GridElementSuper {

    static renderElement(i, sm) {

        function getOption(seriesValue) {
            return {
                xAxis: {
                    type: 'category', // '业务指标''完成率'
                    data: ['业', '务', '指', '标', '完', '成', '率', '业', '务', '指']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: JSON.parse(seriesValue),
                    type: 'line'
                }]
            };
        }

        let rgbMap = JSON.parse(sm.get('rgb'));

        return <div key={i} style={{
            backgroundColor: `rgb(${rgbMap['rgbH']},75,${rgbMap['rgbL']})`,
            borderRadius: '8px',
            borderWidth: '3px',
            borderColor: 'LightGray',
            borderStyle: 'solid'
        }}>

            <ReactEcharts
                option={getOption(sm.get('series'))}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
            /></div>;
    }
}