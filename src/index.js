import React, { createElement, Component } from "react";
import createReactClass from 'create-react-class';
import ReactDOM from "react-dom";
import { css } from "emotion";

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

/**
 * The Interactive component.
 * 
 * In its constructor, it evals and calls the function, returning a Component,
 * which is then rendered.
 * 
 */
class Interactive extends Component {
  constructor(props) {
    super(props);
    const { componentString } = props;
    /* eslint-disable no-new-func */
    const componentFactory = Function(`return ( ${componentString} );`)();
    const Component = componentFactory({
      createReactClass,
      createElement,
      css
    });
    this.state = {
      Component,
      userData: {
        name: "Fancy Times McReader"
      }
    }
  }
  render() {
    const { Component, userData } = this.state
    if (!Component) return null;
    return <Component userData={userData} />;
  }
}


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
