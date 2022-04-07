import React, { useEffect, useState } from "react";
// import Button from '@mui/material/Button';
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import Todo from "./components/Todo";
import db from "./firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import "./App.css";
import { orderBy, query } from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState(["Todolist", "Amazon", "hello"]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const collectionRef = collection(db, "todos");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo, timestamp: doc.data().timestamp }))
      );
    });
  }, []);

  const addTodo = (e) => {
    // Eventlistener for add todo
    e.preventDefault();
    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    });
    setInput(""); // clear the input
  };

  return (
    <div className="App">
      <div className="line"></div>
      

      <h1 className="heading">Todo List</h1>
      <form>
        <FormControl>
          <InputLabel
            sx={{
              color: '#e77665',
              "&.Mui-focused": {
                color: "#e77665",
              },
            }}
          >
            Todo:
          </InputLabel>
          <Input
            sx={{ m: 2 }}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </FormControl>
        <Button
          style={{
            backgroundColor: "#e77665",
          }}
          onClick={addTodo}
          type="submit"
          variant="contained"
          disabled={!input}
        >
          Add Todo
        </Button>
      </form>

      <ul class='list'>
        {todos.map((todo, index) => (
          <Todo key={index} todoObj={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
