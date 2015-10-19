import React, {Component, PropTypes} from 'react';
import Histogram from 'gComponents/lib/histogram';
import Dimensions from 'gComponents/utility/react-dimensions';
import './style.css'
import _ from 'lodash'

const PT = PropTypes
class SimulationHistogram extends Component{
  static propTypes = {
    containerWidth: PT.number,
    height: PT.number,
    simulation: PT.object,
  }

  shouldComponentUpdate(nextProps) {
    return (
      (_.get(nextProps, 'simulation.stats') !== _.get(this.props, 'simulation.stats')) ||
      (nextProps.containerWidth !== this.props.containerWidth) ||
      (nextProps.height !== this.props.height)
    )
  }
  values(){
    return this.props.simulation ? this.props.simulation.sample.values : false
  };
  histogram() {
    return (
      <Histogram data={this.values()}
          height={this.props.height}
          width={this.props.containerWidth + 5}
      />
    )
  };
  render() {
    if (this.values()){
      return (this.histogram())
    } else {
      return false
    }
  }
}

export default Dimensions()(SimulationHistogram)
