import React, { Component } from "react";

// https://pl.reactjs.org/docs/error-boundaries.html

class ErrorBoundary extends Component {
    state = {
      hasError: false
    };
  
    // renders error UI
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
  
    // logs error
    componentDidCatch(error, info) {
      console.log(error, info);
    }
  
    render() {
        if (this.state.hasError) {
            console.log("has error");
            return <h1>ERROR</h1>
        } else {
            console.log("no error");
            return this.props.children;
        }
    }
  }

  export default ErrorBoundary;