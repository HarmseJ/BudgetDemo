import React from 'react';
import { Box, Container, Fab, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSpendingDialog from './AddSpendingDialog.dashboard';

export const AddSpending = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
        top: -25,
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
            onClick={handleOpen}
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
      <AddSpendingDialog open={open} handleClose={handleClose} />
    </Container>
  );
}