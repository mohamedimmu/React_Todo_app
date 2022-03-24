import React from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import ModalWindow from "./ModalWindow";
import db from "../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, deleteDoc } from "firebase/firestore";




function Todo({ todoObj: { todo, id } }) {
  return (
    <div>
      <List>
        <ListItem>
          <ListItemText primary={todo} secondary="Secondary text" />

          <ModalWindow text={todo} keys={id} />

          <IconButton onClick={(e) => deleteDoc(doc(db, "todos", id))}  sx={{m:1}} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
          
        </ListItem>
      </List>
    </div>
  );
}

export default Todo;
