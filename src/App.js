import logo from './logo.svg';
import './App.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Landpage from './component/landpage';
import Loginpage from './component/loginpage';
import './component/font-awesome-4.7.0/css/font-awesome.min.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landpage/>} />
        <Route exact path='/loginpage' element={<Loginpage/>} />
      </Routes>
    </Router>
   
  );
}

export default App;
