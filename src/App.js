import { Route, BrowserRouter, Switch } from "react-router-dom";
import { routes } from "./miscellanous/Routes";
import "./index.css";
import StartPage from "./views/StartPage";
import AuthPage from "./views/AuthPage";
import News from "./views/News";
import User from "./views/User";
import EditProfile from "./views/EditProfile";
import Groups from "./views/Groups";
import Albums from "./views/Albums";
import Search from "./views/Search";
import AlbumDetails from "./views/AlbumDetails";
import AlbumCreator from "./views/AlbumCreator";
import LoginTransition from "./views/LoginTransition";
import ErrorPage from "./templates/ErrorPage";
import ErrorBoundary from "./templates/ErrorBoundary";
import AlbumNotLogged from "./views/AlbumNotLogged";
import GroupCreator from "./views/GroupCreator";
import GroupDetails from "./views/GroupDetails";
import GroupAlbumDetails from "./views/GroupAlbumDetails";
import GroupAlbumCreator from "./views/GroupAlbumCreator";

function App() {
  return (
      <ErrorBoundary>

        <BrowserRouter>
          <Switch>
            <Route exact path={routes.startPage} component={StartPage} />
            <Route exact path={routes.auth} component={AuthPage} />
            <Route exact path={routes.loginTransition} component={LoginTransition} />
            <Route exact path={routes.news} component={News} />
            <Route exact path={routes.user} component={User} />
            <Route exact path={routes.editProfile} component={EditProfile} />
            <Route exact path={routes.search} component={Search} />
            <Route exact path={routes.albums} component={Albums} />
            <Route exact path={routes.album} component={AlbumDetails} />
            <Route exact path={routes.albumCreator} component={AlbumCreator} />
            <Route exact path={routes.groups} component={Groups} />
            <Route exact path={routes.groupCreator} component={GroupCreator} />
            <Route exact path={routes.group} component={GroupDetails} />
            <Route exact path={routes.albumNotLogged} component={AlbumNotLogged} />
            <Route exact path={routes.groupAlbum} component={GroupAlbumDetails} />
            <Route exact path={routes.groupAlbumCreator} component={GroupAlbumCreator} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </BrowserRouter>
        
      </ErrorBoundary>
  );
}

export default App;
