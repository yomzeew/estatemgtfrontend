import logo from './logo.svg';
import './App.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Landpage from './component/landpage';
import Loginpage from './component/loginpage';
import Register from './component/register';
import './component/font-awesome-4.7.0/css/font-awesome.min.css'
import Dashbaordtenant from './component/dashbaord/dashbaordtenant';
import Loginclient from './component/client/loginclient';
import Registerclient from './component/client/registerclient';
import Error404 from './component/error/error404';
import Dashbaordclient from './component/client/dashboardclient';
import Dashboardadmin from './component/admin/dashboard';



function App() {
 
  
  
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landpage/>} />
        <Route exact path='/loginpage' element={<Loginpage/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/dashbaordtenant' element={<Dashbaordtenant/>} />
        <Route exact path='/client/loginpage' element={<Loginclient/>} />
        <Route exact path='/client/register' element={<Registerclient/>} />
        <Route exact path='/client/dashboardclient' element={<Dashbaordclient/>} />
        <Route exact path='/admin/dashboardadmin' element={<Dashboardadmin/>} />
        <Route exact path='*' element={<Error404/>} />
      </Routes>
    </Router>
   
  );
}

export default App;
