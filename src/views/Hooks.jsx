import React, { useState } from "react";

/**
 * 1. Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数
 * 2. Hook 不能在 class 组件中使用
 */

export default class Demo extends React.Component {
    componentDidMount() {
        // const [count, setCount] = useState(0) // Hook 不能在 class 组件中使用, 会报错
    }
    render() {
        return (
            <div>
                <StateDemo />
            </div>
        );
    }
}

function StateDemo(props) {
    const [count, setCount] = useState(10);
    const [todos, setTodos] = useState([{ text: "学习 Hook" }]);
    function handleAdd() {
        setCount(count + 1);
    }
    let handleDelete = () => {
        setCount(count - 1);
    };
    return (
        <div>
            <p>
                <button onClick={handleAdd}>点击增加</button>
            </p>
            <p>
                <button onClick={handleDelete}>点击减少</button>
            </p>
            <p>count: {count}</p>
        </div>
    );
}
