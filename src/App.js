import { Route, BrowserRouter } from "react-router-dom";
import Auth from "../src/components/account/auth";
function App() {
  return (
    <BrowserRouter>
    <Route exact path="/"></Route>
    <Route exact path="/auth"><Auth/></Route>
  </BrowserRouter>
  );
}

export default App;
