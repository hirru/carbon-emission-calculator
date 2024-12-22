import React from "react";
import { CssBaseline, Container } from "@mui/material";
import CalculatorForm from "./components/CalculatorForm";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <CalculatorForm />
      </Container>
    </>
  );
};

export default App;
