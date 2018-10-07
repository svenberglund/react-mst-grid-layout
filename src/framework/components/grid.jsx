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
/*
var layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 5, w: 3, h: 2 },
  { i: 'c', x: 7, y: 0, w: 1, h: 2 }
];
*/

@observer
class SubscriberGridLayout extends React.Component {


  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () { },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  state = {
    currentBreakpoint: this.props.breakpoint,
    compactType: this.props.compactType,
    mounted: false,
  };

  componentDidMount() {
    this.setState({
      mounted: true
    });

    // defaulting some values. TODO: look into using defaultProps instead!
    if (!["vertical", "horizontal", null].includes(this.state.compactType)) {
      this.setState({
        compactType: null
      });
    }

    if (!Object.keys(this.props.cols).includes(this.state.currentBreakpoint)) {
      this.setState({
        currentBreakpoint: "lg"
      })
    }
  }

  generateDOM(elements) {
    /* Returns a map of the items to be rendered and a function to be applied */
    return _.map(elements, function (l, i) {
      return (
        <div key={i}>
          <GridItem subscriptionMap={l.subscriptionMap} index={i} running={l.running} name={l.name} />
        </div>
      );
    });
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };


  onLayoutChange = (layout, layouts) => {
    // We need to updte the MST object here explicitly
    // TODO: this can be optimized, we should not need to loop through all items
    // Why cant we use the 'changed' property, it seems to never be true...?
    for (var i = 0; i < layout.length; i++) {
      subscriberGrid.updatelayoutMap(layout[i]);
    }
    this.props.onLayoutChange(layout, layouts);
  };

  render() {
    return (
      <ResponsiveReactGridLayout className="layout" style={this.props.gridStyle}
        {...this.props}
        layouts={{ lg: subscriberGrid.tasks.map(at => toJS(at).layoutMap) }}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={this.state.mounted}
        compactType={this.state.compactType}
        preventCollision={!this.state.compactType}
      >
        {GridItem.generateDOM(subscriberGrid.tasks)}
      </ResponsiveReactGridLayout>
    );
  }
}

export default SubscriberGridLayout;