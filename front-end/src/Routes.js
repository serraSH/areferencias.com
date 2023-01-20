import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import  App  from './App';
import  SignUp  from './Pages/SignUp';
import  SignIn  from './Pages/SignIn';
import  Profile  from './Pages/Profile';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} exact />
                <Route path="/signin" element={<SignIn />} exact />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} exact />
            </Routes>
        </Router>
    );
}

export default Main;