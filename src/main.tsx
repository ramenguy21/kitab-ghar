import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import Home from "./pages/index.tsx";
import { Route, Switch } from "wouter";
import About from "./pages/about.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/who-we-are" component={About} />
    </Switch>
  </StrictMode>
);
