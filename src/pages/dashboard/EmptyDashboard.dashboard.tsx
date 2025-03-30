import { Container, Typography } from "@mui/material";
import Editor from "../editor/Editor.pages";

export const EmptyDashboard = () => {

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography
        variant="h4"
      >
        No Data Detected
      </Typography>
      <br />
      <Editor />
    </Container>
  );
}