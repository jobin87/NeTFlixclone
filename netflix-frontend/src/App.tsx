import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/sections";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "react-hot-toast";
import { defaultSettings, SettingsProvider } from "./components/settings";
import { ThemeProvider } from "./theme/theme-provider";

function App() {
  return (
    <Provider store={store}>
      <SettingsProvider settings={defaultSettings}>
        <ThemeProvider>
          <BrowserRouter>
            <Toaster />
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </SettingsProvider>
    </Provider>
  );
}

export default App;
