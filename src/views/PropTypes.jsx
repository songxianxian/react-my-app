import React from "react";
import PropTypes from "prop-types";

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {/* <Greeting name={33}/> */}
                <Greeting name="zhansan" />
            </div>
        );
    }
}

class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
Greeting.propTypes = {
    name: PropTypes.string
};




