import { Route, BrowserRouter, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./miscellanous/GlobalTheme";
import { routes } from "./miscellanous/Routes";
import "./index.css";
import StartPage from "./components/startPage/StartPage";
import Auth from "./components/account/auth";
import News from "./views/News";
import UserPage from "./views/UserPage";
import Groups from "./views/Groups";
import Albums from "./views/Albums";
import Search from "./views/Search";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.startPage} component={StartPage}/>
          <Route exact path={routes.auth} component={Auth}/>   
          <Route exact path={routes.news} component={News}/>
          <Route exact path={routes.user} component={UserPage}/>
          <Route exact path={routes.search} component={Search}/>
          <Route exact path={routes.albums} component={Albums}/>
          <Route exact path={routes.groups} component={Groups}/>
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