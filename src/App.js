import './App.css';
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import Navbars from './components/Navbars';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<SignIn/>} />
        <Route path="register" element={<SignUp/>} />
        <Route path="*" element={<Navbars/>} />
        <Route path="/" element={<Navbars/>} />
        <Route path="Dashboard" element={<Dashboard/>} />
      </Route>
    </Routes>
  );
}

export default App;
