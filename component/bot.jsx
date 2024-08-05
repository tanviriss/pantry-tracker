'use client'
import { Box, Modal, Button } from "@mui/material"
import { useState } from "react";
import { generateRecipe } from "./actions";

const Bot = () => {
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState();

  const handleOpen = () => setOpen(true);
  const  handleClose = () => setOpen(false);
  const getData = async () => {
  const ranna = await generateRecipe()
    setRecipe(ranna)
    console.log(ranna)
  }

  return (
      <><Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        {recipe?(<p>{recipe}</p>):(<p>Generating Recipe...</p>)}
      </Box>
    </Modal><Button
      variant="contained"
      onClick={() => {
        handleOpen()
        getData()
      } 
    }
    >
        Generate New Recipe
      </Button></>
  )
}

export default Bot