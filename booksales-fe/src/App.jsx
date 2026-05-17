import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/public"
import PublicLayout from "./layouts/public"
import Books from "./pages/public/books"
import Cart from "./pages/public/cart"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./layouts/admin"
import Dashboard from "./pages/admin"
import AdminBooks from "./pages/admin/books"
import BookCreate from "./pages/admin/books/create"
import BookEdit from "./pages/admin/books/edit"
import BookShow from "./pages/public/books/show" 
import CheckoutSuccess from "./pages/public/checkout-success"
import AdminOrders from "./pages/admin/transactions"
import AdminUsers from "./pages/admin/users"
import AdminAuthors from "./pages/admin/authors"
import AdminGenres from "./pages/admin/genres"
import About from "./pages/public/about"
import Contact from "./pages/public/contact"
import AdminContacts from "./pages/admin/contacts"
import MyOrders from "./pages/public/my-orders"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />} >
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BookShow />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout-success" element={<CheckoutSuccess />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-orders" element={<MyOrders />} />
        </Route>

        {/* Auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="admin" element={<AdminLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="books">
            <Route index element={<AdminBooks />}/>
            <Route path="create" element={<BookCreate />}/>
            <Route path="edit/:id" element={<BookEdit/>} />
            <Route path="show/:id" element={<BookShow />} />
          </Route>
          <Route path="transactions" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="authors" element={<AdminAuthors />} />
          <Route path="genres" element={<AdminGenres />} />
          <Route path="help" element={<AdminContacts />} />
        </Route>

        <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App