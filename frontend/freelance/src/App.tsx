import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./pages/register/Register"
import { Home } from "./pages/home/home"
import { Login } from "./pages/login/Login"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { AddProject } from "./pages/project/AddProject"
import BidForm from "./pages/project/components/BidForm"
import ProjectDetails from "./pages/project/ProjectDetails"
import MyProjects from "./pages/project/MyProjects"


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard/id/:userId" element={<Dashboard/>}/>
      <Route path="/project/add/:userId" element={<AddProject/>}/>
      <Route path="/project/bid/:projectId" element={<BidForm/>}/>
      <Route path="/project/details/:projectId" element={<ProjectDetails/>}/>
      <Route path="/myprojects/:userId" element={<MyProjects/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
