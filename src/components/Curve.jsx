import React from "react";
import ReactDOM from "react-dom";
import Path from "./Path";
import CurveModel from "../models/Curve";
import { concat } from "lodash";

export default class Curve extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paths: [] };
  }

  render() {
    let singlePath = true;

    return (
      <g>
        { singlePath ? 
          <path 
            d={this.singlePathDescription()} 
            stroke={`url(#curvePattern) ${this.props.color || "white"}`}
            strokeWidth={this.props.thickness || 5}
            strokeLinecap="round"
            fill="transparent" /> :
          ( this.state.paths.length > 0 && 
            this.state.paths.map(path => 
              <Path key={this.pathKey(path)} path={path} />
            )
          )
        }
      </g>
    );
  }

  componentWillMount() {
    this.generatePathsFromPoints(this.props.points);
  }

  componentWillReceiveProps(nextProps) {
    this.generatePathsFromPoints(nextProps.points);
  }

  generatePathsFromPoints() {
    let curve = new CurveModel(this.props.points);
    let paths = curve.generatePaths();
    this.setState({ paths });
  }

  pathKey(path) {
    return path.map(point => point.join(" ")).join(" ");
  }

  singlePathDescription() {
    if (this.state.paths.length === 0) {
      return "";
    }

    let paths = concat([], this.state. paths);
    let first = paths.shift();
    let desc = `M ${first[0].join(" ")} Q ${first[1].join(" ")} ${first[2].join(" ")}`;

    let next;
    while (paths.length > 0) {
      next = paths.shift();
      desc += ` Q ${next[1].join(" ")} ${next[2].join(" ")}`;
    }

    return desc;
  }

  singleReflectedPathDescription() {
    if (this.props.points.length < 3) {
      return "";
    }

    let points = concat([], this.props.points);
    let start = points.shift();
    let desc = `M ${start.join(" ")}`;

    let control = points.shift();
    let next = points.shift();
    desc += ` Q ${control.join(" ")} ${next.join(" ")}`;

    while (points.length > 0) {
      next = points.shift();
      desc += ` T ${next.join(" ")}`;
    }

    return desc;
  }
}