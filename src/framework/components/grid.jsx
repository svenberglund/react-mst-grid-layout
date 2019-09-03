import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { observer } from "mobx-react";
import { mstGrids } from "../models/mstGrids";
import { toJS } from 'mobx';
import GridItem from './gridItem';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


/*
  The grid view where the components (gridItems) are mounted. 
  This Component class is the gui representation of the mstGrid (MST) model
*/
@observer
class MstGridLayout extends React.Component {
  static defaultProps = {
    gridName: "defaultGrid",
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
  };

  state = {
    currentBreakpoint: this.props.breakpoint,
    compactType: this.props.compactType,
    mounted: false
  };

  componentDidMount() {
    this.setState({
      mounted: true
    });

    /* 
      defaulting some values.
      TODO: Try defaultProps for these instead!
    */
    if (!["vertical", "horizontal", null].includes(this.state.compactType)) {
      this.setState({
        compactType: null // compacType: null means no 'gravity' in the grid.
      });
    }

    if (!Object.keys(this.props.cols).includes(this.state.currentBreakpoint)) {
      this.setState({
        currentBreakpoint: "lg"
      });
    }
  }

  /* Returns a map of the items to be rendered and a function to be applied */
  generateDOM(elements) {
    return _.map(elements, function(l, i) {
      return (
        <div key={i}>
          <GridItem subscriptionMap={l.subscriptionMap} index={i} />
        </div>
      );
    });
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  /*
    A simple layout example, the way it can be handed to react-grid-layout:
    var layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 5, w: 3, h: 2 },
      { i: 'c', x: 7, y: 0, w: 1, h: 2 }
    ];
  */

  /*
    We need to updte the MST object here explicitly when changes have been made via drag-n-drop.
    The opposite way (from MST to react-grid-layout) we dont need to do explicit update, MST works that way.
    TODO: This can be optimized, we should not need to loop through all items
    Why cant we use the 'changed' property, it seems to never be true...? Look into that.
  */
  onLayoutChange = (layouts, layouts_) => {
    let grid = mstGrids.getGrid(this.props.gridName);
    for (var i = 0; i < layouts.length; i++) {
      grid.updatelayoutMap(layouts[i]);
    }
    this.props.onLayoutChange(layouts, layouts_); // can run implementation specific method as well...
  };

  render() {
    let grid = mstGrids.getGrid(this.props.gridName);
    return (
      <ResponsiveReactGridLayout
        className="layout"
        style={this.props.gridStyle}
        {...this.props}
        layouts={{ lg: grid.items.map(at => toJS(at).layoutMap) }}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={this.state.mounted}
        compactType={this.state.compactType}
        preventCollision={!this.state.compactType}
      >
        {GridItem.generateDOM(grid.items)}
      </ResponsiveReactGridLayout>
    );
  }
}

export default MstGridLayout;