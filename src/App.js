import { Route, BrowserRouter, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./miscellanous/GlobalTheme";
import "./index.css";
import StartPage from "./components/startPage/StartPage";
import Auth from "./components/account/auth";
import Menu from "./components/menu/menu";

// https://lifesaver.codes/answer/browserrouter-ignores-the-history-prop

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StartPage}/>
          <Route exact path="/auth" component={Auth}/>
          <Route exact path="/menu" component={Menu}/>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

/*
  <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StartPage}/>
          <Route exact path="/auth" component={Auth}/>
          <Route exact path="/menu" component={Menu}/>
        </Switch>
      </BrowserRouter>
*/