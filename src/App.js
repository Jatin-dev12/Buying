import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import Approved from './pages/Approved';
import Dashboard from './pages/Dashboard';
import ApprovedAsaToBep from './pages/ApprovedAsaToBep';
import ApprovedAsaToErc from './pages/ApprovedAsaToErc';
import NoPage from './pages/NoPage';




function App() {
  return (
    <BrowserRouter basename='/bridgeapprove'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='approvedethtoasa' element={<Approved />} />
          <Route path='approvedasatobep' element={<ApprovedAsaToBep />} />
          <Route path='approvedasatoerc' element={<ApprovedAsaToErc />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
