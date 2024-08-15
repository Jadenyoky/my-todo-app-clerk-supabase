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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todos"
          element={
            <>
              <SignedOut>
                <h1>in home only when signout</h1>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <Todos />
              </SignedIn>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
