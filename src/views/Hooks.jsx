import React, { useState, useEffect } from "react";

/**
 * 1. Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数（Hook 就是 JavaScript 函数）
 * 2. Hook 不能在 class 组件中使用
 *
 * Hooks使用规则：
 * 1. 只能在函数最顶层调用 Hook。不要在循环、条件判断或者子函数中调用。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。
 * 2. 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。
 * 3. 可以在自定义的 Hook 中使用hook
 *
 * react中的副作用分为2种：
 * 1. 需要清除的 只想在 React 更新 DOM 之后运行一些额外的代码，发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。因为我们在执行完这些操作之后，就可以忽略他们了
 * 2. 不需要清除的
 * 
 * 自定义hook
 * 通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。
 * 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook
 * 与 React 组件不同的是，自定义 Hook 不需要具有特殊的标识。我们可以自由的决定它的参数是什么，以及它应该返回什么（如果需要的话）。
 * 换句话说，它就像一个正常的函数。但是它的名字应该始终以 use 开头，这样可以一眼看出其符合 Hook 的规则
 * 问题：
 * 1. 自定义 Hook 必须以 “use” 开头吗？必须如此
 * 2. 在两个组件中使用相同的 Hook 会共享 state 吗？不会。
 * 3. 自定义 Hook 如何获取独立的 state？每次调用 Hook，它都会获取独立的 state。
 * 在多个hook之间传递消息
 * 
 * 共享组件之间的状态逻辑的流行方式目前有三种： 1. renderProps 2.高阶组件 3. 自定义hook（将相同逻辑抽取到自定义hook中）
 */

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "我是title啊"
        };
    }
    componentDidMount() {
        // const [count, setCount] = useState(0) // Hook 不能在 class 组件中使用, 会报错
    }
    handleChangeTitle = () => {
        this.setState({
            title: "我是title啊"
        });
    };
    render() {
        return (
            <div>
                <StateDemo />
                <EffectDemo title={this.state.title} />
                <button onClick={this.handleChangeTitle}>changeTitle</button>
            </div>
        );
    }
}

//在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”
//useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力
//useEffect跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
//React 保证了每次运行 effect 的同时，DOM 都已经更新完毕
/**
 *
 * 调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。
 * 由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。
 * 默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候
 * 副作用函数还可以通过返回一个函数来指定如何“清除”副作用
 *
 * 每次我们重新渲染，都会生成新的 effect，替换掉之前的
 * 某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染
 * 这正是我们可以在 effect 中获取最新的 count 的值，而不用担心其过期的原因
 *
 * useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行
 * 在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用
 *
 * 为什么要在 effect 中返回一个函数？ 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。
 * 如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。
 *
 * React 何时清除 effect？ React 会在组件卸载的时候执行清除操作。正如之前学到的，effect 在每次渲染的时候都会执行。
 * 这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除
 *
 * 通过跳过 Effect 进行性能优化
 * 在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题, 在class中，在 class 组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps， this.props 或 prevState, this.state 的比较逻辑解决。
 * 如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可。
 * 如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 effect
 * 
 * 特别注意：
 * 一定要确保 数组中 包含了 所有外部作用域中会随时间变化并且在 effect 中使用的变量， 否则当这些变量变化时，useEffect不会执行，用的还是该变量的初始旧值
 * 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行
 */
function EffectDemo(props) {
    console.log("effect demo---");

    const [count, setCount] = useState(10);
    useEffect(() => {
        console.log("useEffect执行了");

        document.title = `次数是${count}${props.title}`;

        //订阅
        return () => {
            //清除副作用的位置
            //取消订阅
        };

        return function cleanUp() {
            //也可以为清除函数命名
        };
    }, [props.title, count]);

    useEffect(function persistForm() {
        //hook只能放在函数的顶层，如果想有条件的执行一个hook, 可以将条件判断放在hook的内部
        // 👍 将条件判断放置在 effect 中
        if (count !== "") {
            localStorage.setItem("formData", count);
        }
    });
    function handleCount() {
        setCount(count + 1);
    }
    return (
        <div>
            <p>effect中count: {count}</p>
            <p>
                <button onClick={handleCount}>effcet 中改变count</button>
            </p>
        </div>
    );
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
