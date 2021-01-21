import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import './App.css';
import AppHeader from './components/AppHeader';
import Content from './containers/Content';
import Details from './containers/Details';

function App() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route exact path = {'/'} component={Content} />
        <Route exact path = '/:movieID' component = {Details} /> 
      </Switch>
    </Router>
  );
}

export default App;
