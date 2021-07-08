import React from 'react';
import MenuExpandContext from './MenuExpand';

// hoc

// nigdzie nie używane

const withMenuExpandContext = (Component) => {
    return function contextComponent(props) {
        return (
            <MenuExpandContext.Consumer>
                {(context) => 
                    <Component {...props} pageContext={context}/>
                }
            </MenuExpandContext.Consumer>
        )
    }
}

export default withMenuExpandContext;