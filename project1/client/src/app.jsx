import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Service } from "./pages/Service"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Logout } from "./pages/Logout"
import { Navbar } from "./components/Navbar"
import { AdminLayout } from "./components/layouts/Admin-Layout"
import { AdminUsers } from "./pages/Admin-Users"
import { AdminContacts } from "./pages/Admin-Contacts"
import { AdminUpdate } from "./pages/Admin-Update" 
import { AdminServices} from "./pages/Admin-Services"
import { AdminServiceUpdate } from "./pages/AdminService-Update" 
import { AdminServiceAdd } from "./pages/Admin-Add-Service" 
import { Error} from "./pages/Error"
import "./index.css"
export function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="users" element={<AdminUsers/>}/>
            <Route path="contacts" element={<AdminContacts/>}/>
            <Route path="services" element={<AdminServices/>}/>
            <Route path="users/:id/edit" element={<AdminUpdate />} />
            <Route path="services/:id/edit" element={<AdminServiceUpdate />} />
            <Route path="services/addservice" element={<AdminServiceAdd />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
