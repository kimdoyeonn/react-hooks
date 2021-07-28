import React, { Component, useState } from "react";
import "./styles.css";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    console.log(event.target);
  };
  return { value, onChange };
};

const App = () => {
  const name = useInput("Mr.");
  return (
    <>
      <h2>Hello</h2>
      <input placeholder="Name" {...name} />
    </>
  );
};

export default App;
