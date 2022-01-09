
import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  // sets state with catched error and renders <ErrorPage>
  static getDerivedStateFromError(error) {
    return { error: error };
  }

  render() {
    if (this.state.error) {
      // when error occurs render page with error message
      return <ErrorPage errorType={this.state.error.message} />;
    } else {
      // when there is no error, render UI
      return this.props.children;
    }
  }
}

export default ErrorBoundary;


