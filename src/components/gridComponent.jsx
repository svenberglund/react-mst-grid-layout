import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 
import { observer } from "mobx-react";
import { asyncTaskSet } from "../models/asyncTaskSet";
import { toJS } from 'mobx';


const ResponsiveReactGridLayout = WidthProvider(Responsive);

var style = {
  backgroundColor: 'red'
}

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

  generateDOM() {
    return _.map(asyncTaskSet.tasks, function(l,i){
      return (
        <div key={i} style={{backgroundColor : (l.color)}} className="">

          {/*  // old implementation - if we want to change the element depending on some prop e.g. static
          <div key={i} style={style} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
          */}

          <span className="text">{l.name}</span>
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
      asyncTaskSet.updateGridblock(layout[i]);
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
        <div>Counter: {asyncTaskSet.tasks.length}</div>
        <ResponsiveReactGridLayout className="layout"
          {...this.props}
          layouts={{ lg: asyncTaskSet.tasks.map(at => toJS(at).gridblock) }}
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
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

/* // old implementation
function generateLayout() {
  return _.map(_.range(0, 10), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      t: "foozzzbar",
      static: Math.random() < 0.05
    };
  });
  //return layout;
  return { lg: asyncTaskSet.tasks.map(at => toJS(at).gridblock) };
}
*/

export default GridLayout;