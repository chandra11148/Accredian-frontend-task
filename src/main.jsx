import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import theme from "./theme.jsx";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
    <ThemeProvider theme={theme}>

    <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        >
      <App />
      </SnackbarProvider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
