import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Projects from './pages/Projects'
import Partner from './pages/Partner'
import Volunteers from './pages/Volunteers'
import Donate from './pages/Donate'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/partner" element={<Partner/>}/>
      <Route path="/volunteers" element={<Volunteers/>}/>
      <Route path="/donate" element={<Donate/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
