import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

// import Test from "./components/Test";
class App extends Component {
    render() {
        return (
            // <Router>
            //     <Switch>
            //         <Route Component="Home.js"></Route>
            //         <Route Component="verification.js"></Route>
            //     </Switch>
            // </Router>
            <Home />
            // <Test />
        );
    }
}

export default App;
