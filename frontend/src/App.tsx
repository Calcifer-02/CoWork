import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../src/app/router/router";

import "./App.css";
function App() {
   return (
      <Router>
         <Routes>
            {routes.map((route, index) => (
               <Route key={index} path={route.path} element={route.element}>
                  {route.children?.map((child, childIndex) => (
                     <Route
                        key={childIndex}
                        path={child.path}
                        element={child.element}
                        index={child.index}
                     />
                  ))}
               </Route>
            ))}
         </Routes>
      </Router>
   );
}

export default App;
