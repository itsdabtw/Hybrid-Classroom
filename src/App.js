import './App.css';
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Routes, Route} from 'react-router-dom';
import Layout from './Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<SignIn/>} />
        <Route path="register" element={<SignUp/>} />
        <Route path="*" element={<SignIn/>} />
        <Route path="/" element={<SignIn/>} />
        <Route path="home" element={<Dashboard/>} />
      </Route>
    </Routes>
  );
}

export default App;
