import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <span>Soul AI</span>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
