import logo from './logo.svg';
import './App.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Landpage from './component/landpage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landpage/>} />
      </Routes>
    </Router>
   
  );
}

export default App;
