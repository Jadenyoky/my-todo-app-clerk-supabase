import { Routes, Route, useLocation } from "react-router-dom";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import "./styles.css"; // تأكد من استيراد ملف CSS هنا
import Test from "./components/test";

function App() {
  const pathname = useLocation();
  return (
    <div>
      <Test />
      <SignedIn key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </SignedIn>
    </div>
  );
}

export default App;
