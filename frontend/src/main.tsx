import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider store={store}>
      <App />
   </Provider>
);
