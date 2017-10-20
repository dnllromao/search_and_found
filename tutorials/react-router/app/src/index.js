import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const App = () => (
	<div>
		<Header />
		<Main />
	</div>
);

const Header = () => (
	<header>
		<nav>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/roster">Roster</Link></li>
				<li><Link to="/schedule">Schedule</Link></li>
			</ul>
		</nav>
	</header>
);

const Main = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/roster" component={Roster} />
			<Route path="/schedule" component={Schedule} />
		</Switch>
	</main>
);

const Home = () => (
	<div>
		home
	</div>
);

const Roster = () => (
	<Switch>
		<Route exact path="/roster" component={FullRoster} />
		<Route path="/roster/:number" component={Player} />
	</Switch>
);

const FullRoster = () => (
	<div>
		fullRoster
	</div>
);

const Player = (props) => {
	console.log(props);
	return (
		<div>
			<p>your player is number {props.match.params.number}</p>
		</div>
	);
}


const Schedule = () => (
	<div>
		schedule
	</div>
);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

// Tutorial : https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf