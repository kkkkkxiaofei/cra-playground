import React, { Component } from 'react';

class MySuspense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: false
    };
  }

  componentDidCatch(e) {
    console.log(e instanceof Promise);
    if (e instanceof Promise) {
      this.setState(
        {
          isPending: true
        },
        () => e.then(() => this.setState({ isPending: false }))
      );
    }
  }

  render() {
    const { isPending } = this.state;
    const { fallback, children } = this.props;
    return isPending ? fallback : children;
  }
}

export default MySuspense;