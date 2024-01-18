import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import "moment/locale/vi";
import moment from "moment";

const App = () => {
  moment.locale("vi");

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
