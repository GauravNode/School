import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SchoolAdminLogin from "./pages/SchoolAdminLogin";

function App() {
return (
 <Router>
  <Routes>
    <Route path="/" element={<SuperAdminLogin/>}/>
    <Route path="/schoolAdmin" element={<SchoolAdminLogin/>}/>
  </Routes>
 </Router>
)

}

export default App
