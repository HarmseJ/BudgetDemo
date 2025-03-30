import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Editor from '../editor/Editor.pages';

export default function CustomAppBar() {

  return (
    <AppBar
      position="sticky"
      elevation={8}
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgb(30, 31, 32)",
        height: "50px",
      }}
    >
      <Toolbar>
        <Typography
          variant="body1"
          flexGrow={1}
        >
          Budget Tracker
        </Typography>
        <Editor />
      </Toolbar>
    </AppBar>
  );
}