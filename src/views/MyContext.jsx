import React from "react";

const ThemeContext = React.createContext("red");
export default class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ThemeContext.Provider value="green">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

class ThemedButton extends React.Component {
    // Assign a contextType to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".
    //第一种
    // static contextType = ThemeContext;
    
    render() {
        console.log('render this.context==', this.context);
        
        // return <Button theme={this.context} />;

        //第三种 ThemeContext.Consumer 适用于存在多个Context
        return (
            <ThemeContext.Consumer>
                {
                    (theme) => <Button theme={theme} />
                }
            </ThemeContext.Consumer>
        )
    }
}
//第二种
ThemedButton.contextType = ThemeContext;

function Button (props) {
    return <button style={{backgroundColor: props.theme}}>按钮</button>
}
