import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends Component {

    state = {
      	error: null,
    };
  
    // renders error UI
    static getDerivedStateFromError(error) {
        return { error: error };
    }
  
    render() {
        if (this.state.error) {
            return <ErrorPage errorType={this.state.error.message}/>
        } else {
            return this.props.children;
        }
    }
          
}

  export default ErrorBoundary;