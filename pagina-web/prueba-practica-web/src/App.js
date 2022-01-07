import './App.css';
import Cliente from './pages/Cliente';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

function App() {
  return (
      <Router path="/" exact>
        <Cliente />
      </Router>
  );
}

export default App;
