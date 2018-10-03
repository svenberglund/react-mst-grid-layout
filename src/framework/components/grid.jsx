import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 
import { observer } from "mobx-react";
import { subscriberGrid } from "../models/subscriberGrid";
import { toJS } from 'mobx';
import GridItem from './gridItem';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// A simple layout example
/*var layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 5, w: 3, h: 2 },
  { i: 'c', x: 7, y: 0, w: 1, h: 2 }
];*/

//var layouts = { lg: layout };

@observer
class GridLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM(elements) {
    /* Returns a map of the items to be rendered and a function to be applied */
    return _.map(elements, function(l,i){
      return (

        <div key={i}>
          <GridItem  subscriptionMap={l.subscriptionMap} index={i} running={l.running} name={l.name} />
       </div>
      );
    });
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onCompactTypeChange = () => {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical" ? null : "horizontal";
    this.setState({ compactType });
  };

  onLayoutChange = (layout, layouts) => {
    // We need to updte the MST object here explicitly
    // TODO: this can be optimized, we should not need to loop through all blocks
    // Why cant we use the 'changed' property, it seems to never be true...?
    for(var i=0; i< layout.length; i++ ){
      //console.log(`parameter: ${JSON.stringify(layout[i])}`);
      subscriberGrid.updatelayoutMap(layout[i]);
    }
    this.props.onLayoutChange(layout, layouts);
  };

  onNewLayout = () => {
   //this.setState({ // old implementation - change diectly in MST instead
   //   layouts: { lg: generateLayout() }
   // });
  };

  render() {
    return (
      <div>
        <div>
          Current Breakpoint: {this.state.currentBreakpoint} ({
            this.props.cols[this.state.currentBreakpoint]
          }{" "}
          columns)
        </div>
        <div>
          Compaction type:{" "}
          {_.capitalize(this.state.compactType) || "No Compaction"}
        </div>
        <button onClick={this.onNewLayout}>Generate New Layout</button>
        <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button>
        <div>Counter: {subscriberGrid.tasks.length}</div>

        <ResponsiveReactGridLayout className="layout" style={{backgroundColor : 'LightSteelBlue'}}
          {...this.props}
          layouts={{ lg: subscriberGrid.tasks.map(at => toJS(at).layoutMap) }}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {GridItem.generateDOM(subscriberGrid.tasks)}
        </ResponsiveReactGridLayout>
        
      </div>
    );
  }
}

export default GridLayout;