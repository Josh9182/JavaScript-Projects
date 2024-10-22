import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './Loading';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Loading" element={<Loading />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
