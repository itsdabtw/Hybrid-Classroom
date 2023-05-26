import './App.css';
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import ClassHome from './pages/class/ClassHome';
import Members from './pages/members/Members';
import Calendar from './components/Calendar';

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
        <Route path="calendar" element={<Calendar/>} />
      </Route>
    </Routes>
  );
}

export default App;
  