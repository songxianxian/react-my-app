import React from "react";
export default class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            name: '',
        };
        // this.handleClick = this.handleClick.bind(this);
    }
    handleClick(text, e) {
        console.log("text==", text);

        console.log("e===", e);
        console.log("this===", this);
    }
    // handleClick = (e) => {
    //     console.log('e===', e);
    //     console.log('this===', this);
    // }
    handleChange = (e) => {
        console.log('value===', e.target.value);
        // this.setState({
        //     name: e.target.value
        // })
        const name = e.target.value;
        this.setState((state, props) => {
            // console.log('state=', state, 'props==', props);
            return {
                name: name
            }
        })
    }
    render() {
        const numbers = [1, 2, 3, 4, 5];
        const listItems = numbers.map(numbers => <li key={numbers}>{numbers}</li>);
        return (
            <div className="basic">
                <button onClick={this.handleClick.bind(this, "99")}>
                    {this.state.isToggleOn ? "ON" : "OFF"}
                </button>
                <ul>
                    {listItems}
                </ul>
                <input type="text" value={this.state.name} onChange={this.handleChange}/>
            </div>
        );
    }
}
