import React from "react";
import Basic from "./pages/Basic.jsx";
import UrlParams from "./pages/UrlParams.jsx";
import Redirects from "./pages/Redirects.jsx";
import CustomLink from "./pages/CustomLink.jsx";
import PreventingTransitions from "./pages/PreventingTransitions.jsx";
import NoMatch from './pages/NoMatch';
import Recursive from './pages/Recursive.jsx'
import Sidebar from './pages/Sidebar'
import Animation from './pages/Animation'
import RouteConfig from './pages/RouteConfig'
import ModalGallery from './pages/ModalGallery'
import StaticRouter from './pages/StaticRouter'
import QueryParams from './pages/QueryParams'
import LoadableDemo from './pages/Loadable'

function App(props) {
    return (
        <div className="main">
            {/* <div>
               <h2>basic基础</h2>
               <Basic/>
           </div> */}

            {/* <div>
               <h2>url-params</h2>
               <UrlParams/>
           </div> */}

            {/* <div>
               <h2>url-params</h2>
               <UrlParams/>
           </div> */}

            {/* <div>
               <h2>Redirects</h2>
               <Redirects/>
           </div> */}

            {/* <div>
                <h2>CustomLink</h2>
                <CustomLink />
            </div> */}

            {/* <div>
                <h2>PreventingTransitions</h2>
                <PreventingTransitions />
            </div> */}

            {/* <div>
                <h2>NoMatch</h2>
                <NoMatch />
            </div> */}

            {/* <div>
                <h2>Recursive</h2>
                <Recursive />
            </div> */}

            {/* <div>
                <h2>Sidebar</h2>
                <Sidebar />
            </div> */}

            {/* <div>
                <h2>Animation</h2>
                <Animation/>
            </div> */}

            {/* <div>
                <h2>RouteConfig</h2>
                <RouteConfig/>
            </div> */}

            {/* <div>
                <h2>ModalGallery</h2>
                <ModalGallery/>
            </div> */}

            {/* <div>
                <h2>StaticRouter</h2>
                <StaticRouter/>
            </div> */}

            {/* <div>
                <h2>QueryParams</h2>
                <QueryParams/>
            </div> */}

            <div>
                <h2>LoadableDemo</h2>
                <LoadableDemo/>
            </div>
        </div>
    );
}
export default App;
