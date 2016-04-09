import React from "react";
import ReactDOM from "react-dom";

export default class ImagePattern extends React.Component {
  render() {
    return (
      <pattern 
        id={this.props.id}
        x="0" 
        y="0" 
        width={this.props.width} 
        height={this.props.height} 
        patternUnits="userSpaceOnUse">
        <image 
          xlinkHref={this.props.imageHref} 
          x="0" 
          y="0" 
          width={this.props.width} 
          height={this.props.height} 
          preserveAspectRatio="none" />
      </pattern>
    );
  }
}
