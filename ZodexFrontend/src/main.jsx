// import "./gsapScroll.css";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ScrollProvider } from "./Context/ScrollContext.jsx";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <ScrollProvider>
      <App />
    </ScrollProvider>
  </BrowserRouter>
);
