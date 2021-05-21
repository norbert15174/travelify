import { Route, BrowserRouter } from "react-router-dom";
import Auth from "../src/components/account/auth";
import Rescources from "../src/components/account/resources";
function App() {
  return (
    <BrowserRouter>
    {/* <Menu/> */}
    <Route exact path="/"></Route>
    <Route exact path="/auth"><Auth/></Route>
    <Route exact path="/resources"><Rescources/></Route>
  </BrowserRouter>
  );
}

export default App;
