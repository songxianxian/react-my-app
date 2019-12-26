import React, { createElement } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Basic from './views/basic.jsx';
import MyRefs from './views/refs.jsx';
import ErrorBoundary from './views/error_boundary.jsx';
import Portal from './views/Portal.jsx';
import MyContext from './views/MyContext.jsx';
import Life from './views/Life.jsx';
import CreateElement from './views/CreateElement.jsx';
import RenderProps from './views/RenderProps.jsx';
import MyPropTypes from './views/PropTypes.jsx';
import HighOrderComponent from './views/HighOrderComponent.jsx';
import Hooks from './views/Hooks.jsx';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/basic">Basic</Link>
                        </li>
                        <li>
                            <Link to="/refs">refs</Link>
                        </li>
                        <li>
                            <Link to="/error">error_boundary</Link>
                        </li>
                        <li>
                            <Link to="/portal">插槽</Link>
                        </li>
                        <li>
                            <Link to="/context">context</Link>
                        </li>
                        <li>
                            <Link to="/life">生命周期</Link>
                        </li>
                        <li>
                            <Link to="/createElement">React.createElement 深入JSX</Link>
                        </li>
                        <li>
                            <Link to="/renderProps">Render Props</Link>
                        </li>
                        <li>
                            <Link to="/propTypes">PropTypes</Link>
                        </li>
                        <li>
                            <Link to="/highOrderComponent">高阶组件</Link>
                        </li>
                        <li>
                            <Link to="/hooks">Hooks</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/basic">
                        <Basic />
                    </Route>
                    <Route path="/refs">
                        <MyRefs />
                    </Route>
                    <Route path="/error">
                        <ErrorBoundary/>
                    </Route>
                    <Route path="/context">
                        <MyContext />
                    </Route>
                    <Route path="/life">
                        <Life/>
                    </Route>
                    <Route path="/createElement">
                        <CreateElement/>
                    </Route>
                    <Route path="/renderProps">
                        <RenderProps/>
                    </Route>
                    <Route path="/propTypes">
                        <MyPropTypes/>
                    </Route>
                    <Route path="/highOrderComponent">
                        <HighOrderComponent/>
                    </Route>
                    <Route path="/hooks">
                        <Hooks/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;


