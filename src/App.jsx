import "./App.css"
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import User from './pages/User'
import CreateUser from './pages/CreateUser'
import UpdateUser from './pages/UpdateUser'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<User/>}/>
        <Route path="/createUser" element={<CreateUser/>}/>
        <Route path="/updateUser/:id" element = {<UpdateUser/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;