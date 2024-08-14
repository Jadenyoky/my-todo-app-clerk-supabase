import { Routes, Route } from 'react-router-dom';
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Home from './pages/Home';
import Todos from './pages/Todos';
import './styles.css'; // تأكد من استيراد ملف CSS هنا

function App() {
  return (
    <div className="container">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="header">
          <h1>My To-Do App</h1>
          <UserButton />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </SignedIn>
    </div>
  );
}

export default App;
