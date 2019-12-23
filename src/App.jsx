import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Basic from './views/basic.jsx';
import MyRefs from './views/refs.jsx';
import ErrorBoundary from './views/error_boundary.jsx';
import Portal from './views/Portal.jsx';

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
                    <Route path="/portal">
                        <Portal />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;


