import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GitForm from "./components/form";
import Expand from "./components/expand";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={GitForm}>
						{/* <GitForm /> */}
					</Route>
					<Route exact path="/expand" component={Expand}>
						{/* <Expand /> */}
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
