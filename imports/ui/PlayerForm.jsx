import React, { Component } from 'react';

export class PlayerForm extends Component {
  state = {
    name: '',
  };

  render() {
    return (
      <div className='name-form'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSubmit(this.state.name);
          }}
        >
          <img src={'/logo.svg'} />
          <div className='enter-player'>
            <p>Type your name and hit Enter</p>
            <input
              type='text'
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}
