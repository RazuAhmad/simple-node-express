import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const name = useRef();
  const email = useRef();
  useEffect(() => {
    fetch("http://localhost:5000/allUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const newName = name.current.value;
    const emailName = email.current.value;
    const givenData = { first_name: newName, email: emailName };
    console.log("given data are", givenData);

    fetch("http://localhost:5000/allUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(givenData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser);
      });
    name.current.value = "";
    email.current.value = "";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleForm}>
        <input
          ref={name}
          style={{ width: "240px", height: "23px", borderRadius: "4px" }}
          type="text"
          name=""
          id=""
          placeholder="enter your name"
        />
        <br />
        <br />
        <input
          ref={email}
          style={{ width: "240px", height: "23px", borderRadius: "4px" }}
          type="email"
          name=""
          placeholder="enter your email"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>

      <h2>Load my data now</h2>

      {users.map((pd) => (
        <p key={pd.id}>{pd.first_name}</p>
      ))}
    </div>
  );
};

export default App;
