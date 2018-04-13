import React, { createElement, Component } from "react";
import createReactClass from 'create-react-class';
import { css, cx } from "emotion";

export default class Interactive extends Component {
  constructor(props) {
    super(props);
    const { componentString } = props;
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
