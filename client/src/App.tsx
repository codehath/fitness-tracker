import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllLogs from './pages/AllLogs';
import Example from './pages/Example';
import FullLog from './pages/FullLog';
import NewLogPage from './pages/NewLogPage';
import Account from './pages/Account';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs/:userId" element={<AllLogs />} />
        <Route path="/logs/:userId/:logId" element={<FullLog />} />
        <Route path="/logs/new" element={<NewLogPage />} />
        <Route path="/example" element={<Example />} />
        <Route path="/account/:userId" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
