import './App.css';
import { Search } from './components/Search';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <div>Books with Hooks</div>
          <ul className="menu"><li><Link to="/">Home</Link></li><li><Link to="/search">Search</Link></li></ul>
        </header>
        <Security issuer='https://dev-69718841.okta.com/'
        <Search />
      </Router>
    </div>
  );
}

export default App;
