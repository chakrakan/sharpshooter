import React, { Component } from 'react';
import _ from 'lodash';
import { Target } from './Target';
import { Transition, animated } from 'react-spring/renderprops';
import { withTracker } from 'meteor/react-meteor-data';
import { GameCollection } from '../api/game.collection';

const AnimatedTarget = animated(Target);
export class App extends Component {
  state = {
    x: 0,
    y: 0,
  };

  componentDidMount() {
    const self = this;
    setInterval(function () {
      const gameId = self.props.game._id;
      if (gameId) {
        Meteor.call('game.ping', gameId);
      }
    }, 5000);

    let isPointerLocked = false;

    window.addEventListener('click', () => {
      if (!isPointerLocked) document.body.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
      isPointerLocked = document.pointerLockElement === document.body;
    });

    let x = 0,
      y = 0;

    const view = { x, y };
    window.addEventListener('mousemove', (e) => {
      if (isPointerLocked) {
        x += e.movementX;
        y += e.movementY;
        view.x = x;
        view.y = y;
      }
    });

    const animation = () => {
      this.setState(view);
      window.requestAnimationFrame(animation);
    };
    window.requestAnimationFrame(animation);
  }

  render() {
    const { x, y } = this.state;
    return (
      <>
        <div className='crosshair' />
        <Transition
          native
          items={this.props.game.targets}
          keys={(target) => target._id}
          from={{ scale: 0 }}
          enter={{ scale: 1 }}
          leave={{ scale: 0 }}
        >
          {(target) => {
            return (props) => {
              return (
                <AnimatedTarget
                  style={props}
                  key={target._id}
                  _id={target._id}
                  onClick={(_id) =>
                    Meteor.call('game.targetHit', this.props.game._id, _id)
                  }
                  x={target.x - x}
                  y={target.y - y}
                  size={target.size}
                />
              );
            };
          }}
        </Transition>
      </>
    );
  }
}

/**
 * withTracker returns a function
 * that function gets passed a component
 * and returns the resulting component now wrapped with reactive updates
 */
export const AppWithTracker = withTracker(({ gameId }) => {
  const game = GameCollection.findOne({ _id: gameId }) || { targets: [] };
  return { game };
})(App);
