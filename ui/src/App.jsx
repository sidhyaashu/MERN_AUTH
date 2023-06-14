import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import LoginRegs from "./pages/auth/LoginRegs";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<HomePage/>}/>
          <Route path='contact' element={<ContactPage/>}/>
          <Route path='login' element={<LoginRegs/>}/>
          <Route path='send-password-reset-email' element={<SendPasswordResetEmail/>}/>
          <Route path='reset' element={<ResetPassword/>}/>
        </Route>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='*' element={<h1>Error 404 Page not found</h1>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
