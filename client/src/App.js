import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import logo from "./logo.svg"
import Search from "./components/Search"
import Saved from "./components/Saved"
import Wrapper from "./components/Wrapper"
import Jumbotron from "./components/Jumbotron"
import "./styles/App.css";
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
            <h3>Search for and Save Books of Interest</h3>
          </Jumbotron>
          <Wrapper>
              <Route exact path="/" component={Search} />
              <Route exact path="/saved" component={Saved} />
          </Wrapper>
        </div>
      </Router>
    </div>
  )
}

export default App;
