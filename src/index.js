import React, { Component } from "react";
import ReactDOM from "react-dom";
import { css } from "emotion";

import Interactive from "./Interactive";

/**
 * This is what is published:
 *
 * A function that takes an object and returns a component.
 *
 * Although we are currently using React and emotion, we can think of this as
 * an **interface**.
 */
const scoopData = `
function create({ createReactClass, createElement: h, css }) {
  return createReactClass({
    displayName: 'CoolThing',
    componentDidMount: function() {
      console.log('component did mount')
    },
    render: function() {
      const { userData } = this.props;
      return h('div', { className: css({ color: 'red' }) }, 
        h('div', null, "Hello from an interactive."), 
        h('div', { className: css({ color: 'black' }) }, "Your name is: " + userData.name)
      )
    }
  })
}
`;

class Demo extends Component {
  render() {
    return (
      <div className="App">
        <div
          className={css`
            text-align: center;
          `}
        >
          <div>An interactive:</div>
          <Interactive componentString={scoopData} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"));
