import React, { Component } from "react";
import Error from "./Error";

// https://pl.reactjs.org/docs/error-boundaries.html

class ErrorBoundary extends Component {

    state = {
      	hasError: false,
		errorType: "",
    };
  
    // renders error UI
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
  
    // logs error
    componentDidCatch(error, info) {
	  	this.setState({errorType: error.message})
    }
  
    render() {
        if (this.state.hasError) {
            return <Error errorType={this.state.errorType}/>
        } else {
            return this.props.children;
        }
    }
          
}

  export default ErrorBoundary;