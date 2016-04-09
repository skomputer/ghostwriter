import React from "react";
import ReactDOM from "react-dom";
import Graph from "./Graph";
import { complexTimeWave } from "../util/math";

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 800, height: 800 };
    this.animationId = null;
  }

  render() {
    return (
      <div>
        <Graph 
          ref="graph"
          width={this.state.width} 
          height={this.state.height}
          numPoints={this.props.numPoints} />
      </div>
    );
  }

  componentWillMount() {
    this.updateGraphSize();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown.bind(this));
    window.addEventListener("keyup", this.handleKeyup.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  startAnimation() {
    if (this.animationId) return;

    let step;
    step = (timestamp) => {
      let proximity = this.calculateProximity(timestamp);
      this.addPoint(proximity);
      this.animationId = window.requestAnimationFrame(step);
    }

    this.animationId = window.requestAnimationFrame(step);    
  }

  stopAnimation() {
    if (!this.animationId) return;

    window.cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }

  toggleAnimation() {
    this.animationId ? this.stopAnimation() : this.startAnimation();
  }

  updateGraphSize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleKeydown(event) {
    if (event.code === "Backspace" || event.keyCode === 8) {
      event.preventDefault();
    }

    if (this.hasCtrlKey(event)) {
      if (event.code === "KeyA" || event.keyCode === 65) {
        this.toggleAnimation();
      }
    } else {
      this.startAnimation();
    }
  }

  handleKeyup(event) {
    if (!this.hasCtrlKey(event) && event.code !== "KeyA" && !this.isCtrlKey(event)) {
      this.stopAnimation();
    }
  }

  isCtrlKey(event) {
    return ["OSLeft", "ControlLeft", "AltLeft", "OSRight", "ControlRight", "AltRight"].indexOf(event.code) !== -1;
  }

  hasCtrlKey(event) {
    return event.ctrlKey || event.altKey || event.metaKey;
  }

  calculateProximity(timestamp) {
    timestamp = timestamp || Date.now();
    let max = Math.min(this.state.width, this.state.height) / 3;
    let min = 5;
    let proximity = complexTimeWave(timestamp, 100, max, min);

    return proximity;
  }

  addPoint() {
    this.refs.graph.addPoint(this.calculateProximity());
  }

  handleResize(event) {
    this.updateGraphSize();
  }
}