import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import InfoRounded from '@mui/icons-material/InfoRounded';
import NavigationTabs from './NavigationTabs.editor';
import Box from '@mui/material/Box/Box';
import Content from './Content.editor';
import { useGlobalStateProvider } from '../../providers/GlobalStateProvider.providers';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Editor() {
  const { editorActive, setEditorActive } = useGlobalStateProvider();

  const handleClickOpen = () => {
    setEditorActive(true);
  };

  const handleClose = () => {
    setEditorActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        size='small'
        sx={{
          backgroundColor: "rgb(46, 90, 109)",
          fontSize: {
            xs: "0.8rem",
            xl: "0.9rem",
          },
        }}
      >
        Budget Editor
      </Button>
      <Dialog
        fullScreen
        open={editorActive}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
        <AppBar sx={{ position: 'sticky', backgroundColor: "rgb(28, 28, 28)" }}>
          <Toolbar>
            <IconButton
              disabled
              edge="start"
            >
              <InfoRounded sx={{ color: "white" }} />
            </IconButton>

            <Typography variant="body1" flex={1} fontSize={"0.9rem"}>
              You are in Budget Editor
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleClose}
              sx={{
                backgroundColor: "rgb(46, 90, 109)",
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            height: "100%",
            backgroundColor: "rgb(48, 48, 48)",
          }}
        >
          <NavigationTabs />
          <Content />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}