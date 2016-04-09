import React from "react";
import ReactDOM from "react-dom";

export default class Path extends React.Component {
  render() {
    return (
      <path d={this.pathDescription()} stroke="black" fill="transparent"/>
    );
  }

  pathDescription() {
    let [start, control, end] = this.props.path;

    return `M ${start.join(" ")} Q ${control.join(" ")} ${end.join(" ")}`;
  }
}