import React, {useState} from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import ModalWindow from "./ModalWindow";
import db from "../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, deleteDoc } from "firebase/firestore";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const listStyle = {
  border: "5px solid #e6f2fe",
  borderLeft: "none",
  borderRight: "none",
};

const listItemStyle = {
  paddingLeft: "2.4rem",
};



function Todo({ todoObj: { todo, id, timestamp } }) {
const locale = 'en-IN';
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  // weekday: 'long',
};

const date = timestamp && new Date(timestamp.seconds * 1000);
const formattedDate = new Intl.DateTimeFormat(locale, options).format(date)

const[checked, setChecked] = useState(false);

const checkboxStyle = checked? {
  paddingLeft: "2.4rem",
  textDecoration: "line-through",
  textDecorationColor: "#e77665",
  textDecorationStyle: "wavy",
  textDecorationThickness: "0.2rem"
} : listItemStyle

const handleChange = (e) => {
  setChecked(e.target.checked)
}

  return (
    <div>
      <List>
        <ListItem sx={listStyle}>
          <Checkbox
            sx={{
              color: "#e77665",
              "&.Mui-checked": {
                color: '#e77665',
              },
            }}
            {...label}
            checked={checked}
            onChange={handleChange}
          />

          <ListItemText
            sx={checkboxStyle}
            primary={todo}
            secondary={formattedDate}
          />

          <ModalWindow text={todo} keys={id} />

          <IconButton
            onClick={(e) => deleteDoc(doc(db, "todos", id))}
            sx={{ m: 1 }}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon sx={{color: '#e77665'}} />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
}

export default Todo;
