import "./assets/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Switch } from "wouter";

//page imports
import Home from "./pages/index.tsx";
import About from "./pages/about.tsx";
import Events, { EventPage } from "./pages/events.tsx";
import Shop from "./pages/shop.tsx";
import Join from "./pages/join.tsx";
import Registration from "./pages/register.tsx";
import { EventsProvider } from "./components/contexts/events.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*Remove before pushing to prod, cache busting. */}
    <use href={`/icons.svg?cache=${Date.now()}#${name}`} />
    <EventsProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/who-we-are" component={About} />
        <Route path="/events" component={Events} />
        <Route path="/event/:id" component={EventPage} />
        <Route path="/event/:id/register" component={Registration} />

        <Route path="/shop" component={Shop} />
        <Route path="/join" component={Join} />
      </Switch>
    </EventsProvider>
  </StrictMode>
);
