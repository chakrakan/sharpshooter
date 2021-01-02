import React, { Component } from 'react';

export class Target extends Component {
  componentDidMount() {
    window.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    window.addEventListener('click', this.onClick);
  }

  onClick = (e) => {
    let wx = window.innerWidth / 2,
      wy = window.innerHeight / 2;
    const { x, y } = this.getDisplayCoordinates();
    let r = this.props.size / 2;
    let cx = x + r,
      cy = y + r;

    let d = Math.sqrt(Math.pow(cx - wx, 2) + Math.pow(cy - wy, 2));

    if (d <= r) {
      this.props.onClick(this.props._id);
    }
  };

  getDisplayCoordinates() {
    let { x, y, size } = this.props;
    x *= size / 100;
    y *= size / 100;
    return { x, y };
  }

  render() {
    const { size } = this.props;
    const { x, y } = this.getDisplayCoordinates();
    return (
      <div
        className='target'
        style={{
          backgroundColor: this.props.style.color || 'white',
          zIndex: size,
          width: size,
          height: size,
          transform: `translate3d(${x}px, ${y}px, 0) scale(${this.props.style.scale})`,
        }}
      />
    );
  }
}
