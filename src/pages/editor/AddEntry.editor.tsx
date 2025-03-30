import React from 'react';
import { Box, Container, Fab, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddEntryDialog from "./AddEntryDialog.editor";

export const AddEntry = () => {
  const [open, setOpen] = React.useState(false);

  const handleEntryOpen = () => {
    setOpen(true);
  };

  const handleEntryClose = () => {
    setOpen(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "fit-content",
        width: "100%",
        color: "white",
        top: -35,
        position: "relative",
      }}
    >
      <Box>
        <Paper
          elevation={10}
          sx={{
            backgroundColor: "transparent",
            borderRadius: "50px"
          }}
        >
          <Fab
            onClick={handleEntryOpen}
            sx={{
              backgroundColor: "rgb(28, 28, 28)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgb(48, 48, 48)",
              },
            }}
          >
            <AddIcon />
          </Fab>
        </Paper>
      </Box>
      <AddEntryDialog open={open} handleEntryClose={handleEntryClose} />
    </Container>
  );
}