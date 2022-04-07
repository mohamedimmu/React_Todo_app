import React, { useState } from "react";
import {
  Modal,
  Typography,
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ModeIcon from "@mui/icons-material/Mode";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalWindow({ text, keys }) {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true);};
  const handleClose = () => setOpen(false);

  const updateTodo = () => {
    const todoRef = doc(db, "todos", keys);
    setDoc(todoRef, { todo: input }, { merge: true });
    handleClose();
  };

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        sx={{ m: 1 }}
        edge="end"
        aria-label="edit"
      >
        <ModeIcon sx={{color:'#e77665'}} />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              TodoList
            </Typography>
            <CancelOutlinedIcon onClick={handleClose} color="error" />
          </Box>

          <FormControl sx={{ mb: 2 }} fullWidth variant="filled">
           
            <TextField
              label="Todo"
              id="filled-hidden-label-normal"
              defaultValue={text}
              variant="filled"
              onChange={e => {setInput(e.target.value)}}
            />
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={updateTodo} variant="contained">
              Save
              <SaveIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalWindow;
