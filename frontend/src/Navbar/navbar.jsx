import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./styles.css";

export default function Navbar() {
  return (
    <Box className="navbar-container">
      <Toolbar>
        <Typography variant="h5">Your Favourite Gift Shop</Typography>
      </Toolbar>
    </Box>
  );
}
