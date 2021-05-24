import { Route, BrowserRouter } from "react-router-dom";
import Auth from "./components/account/Auth";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <BrowserRouter>
    
    <Route exact path="/">
      <Menu/>
    </Route>
    <Route exact path="/auth"><Auth/></Route>
  </BrowserRouter>
  );
}

export default App;
