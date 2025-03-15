import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SearchBar from "./components/SearchBar";
import CryptoTable from "./components/CryptoTable";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Crypto Tracker
      </Typography>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CryptoTable searchQuery={searchQuery} />
    </Container>
  );
};

export default App;
