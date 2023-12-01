import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import adminRouter from "./routers/adminRouter";
import publicRoutes from "./routers/defaulLayoutRouter";
import DefaultLayout from "./layouts/DefaultLayout";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faArrowUp);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Component />
                  </DefaultLayout>
                }
              ></Route>
            );
          })}

          {adminRouter.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AdminLayout>
                    <Component />
                  </AdminLayout>
                }
              ></Route>
            );
          })}
        </Routes>
      </BrowserRouter>
      <FontAwesomeIcon></FontAwesomeIcon>
    </div>
  );
}
export default App;
