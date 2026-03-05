import { Routes, Route } from "react-router-dom";
import SignUp from "./features/auth/Singup";
import SignIn from "./features/auth/Signin";
import Home from "./features/landing/Pages/Home";
import About from "./features/landing/Pages/About";
import Gallery from "./features/landing/Pages/Gallery";
import Contact from "./features/landing/Pages/Contact";
import Dashboard from "./features/admin/Dashboard";
import BillingPage from "./features/admin/billing/BillingPage";
import InvoiceForm from "./features/admin/billing/InvoiceForm";
import InvoiceList from "./features/admin/billing/InvoiceList";
import Reservations from "./features/room managment/Reservations";
import Roomdashboard from "./features/room managment/Roomdashboard";
import RoomInventory from "./features/room managment/Roominventory";
import AddRooms from "./features/room managment/Addrooms";
import RoomList from "./features/room managment/Roomslist";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} /> 

      <Route path="/dashboard" element={<Dashboard />}>
      <Route path="billing" element={<BillingPage />} />
      <Route path="billing/create" element={<InvoiceForm />} />
      <Route path="billing/list" element={<InvoiceList />} />
      <Route path="rooms" element={<Roomdashboard />} />
       <Route path="rooms/reservations" element={<Reservations />} />
       <Route path="rooms/inventory" element={<RoomInventory />} />
       <Route path="rooms/addrooms" element={<AddRooms />} />
       <Route path="rooms/roomslist" element={<RoomList />} />
      </Route>
    </Routes>
  );
}

export default App;
