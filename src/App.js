import './App.css';
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Doc from './pages/doc/Doc';
import Members from './pages/members/Members';
import Homework from './pages/homework/Homework';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<SignIn/>} />
        <Route path="register" element={<SignUp/>} />
        <Route path="*" element={<SignIn/>} />
        <Route path="/" element={<SignIn/>} />
        <Route path="home" element={<Home/>} />
        <Route path="classhome" element={<Dashboard/>} />
        <Route path="members" element={<Members/>} /> 
        <Route path="homework" element={<Homework/>} />
        <Route path="doc" element={<Doc/>} />
      </Route>
    </Routes>
  );
}

export default App;
  