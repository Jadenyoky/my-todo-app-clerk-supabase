import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";

const Test = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <h1>Test</h1>
      <SignedIn>
        <div className="header">
          <h1>My To-Do App</h1>
          <UserButton />
        </div>
      </SignedIn>
    </>
  );
};

export default Test;
