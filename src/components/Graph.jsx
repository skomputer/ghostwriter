import React from "react";
import ReactDOM from "react-dom";
import Curve from "./Curve";
import ImagePattern from "./ImagePattern";
import { range, random, concat, last } from "lodash";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: props.width,
      height: props.height,
      points: []
    };
  }

  render() {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        width={this.state.width} 
        height={this.state.height}>
        <defs>
          { this.props.image && 
            <ImagePattern 
              id="curvePattern"
              width={this.state.width} 
              height={this.state.height} 
              imageHref={this.props.image} />
          }
        </defs>
        <Curve 
          points={this.state.points} 
          color={this.props.color} 
          thickness={this.props.thickness} />
      </svg>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ width: nextProps.width, height: nextProps.height });
  }

  generatePoints() {
    let ary = range(this.props.numPoints);
    let point = this.randomPoint();

    return ary.reduce(result => {
      point = this.nearbyPoint(point, this.props.proximity);
      result.push(point);
      return result;
    }, [point]);
  }

  addPoint(proximity) {
    let points = concat([], this.state.points);
    let newPoint;

    if (points.length > 0) {
      newPoint = this.nearbyPoint(last(points), proximity);
    } else {
      newPoint = this.randomPoint();
    }

    points.push(newPoint);

    if (points.length > this.props.numPoints) {
      points.shift();
    }

    this.setState({ points });
  }

  randomPoint() {
    return [
      random(this.props.width),
      random(this.props.height)
    ];
  }

  nearbyPoint(previous, proximity) {
    return [
      this.nearbyNumber(previous[0], proximity, this.props.width),
      this.nearbyNumber(previous[1], proximity, this.props.height),
    ];
  }

  nearbyNumber(num, proximity, max) {
    let padding = 0;
    let nearby = this.withinBounds(num + 2 * random(proximity) - proximity, padding, max - padding);

    if (nearby === num) {
      nearby += random(1) ? 1 : -1;
    }

    return nearby;
  }

  withinBounds(num, min, max, wobble = 50) {
    // narrow lower and uppser bounds by random offset
    let offset = random(wobble);
    return Math.min(Math.max(min + offset, num), max - offset);
  }
}