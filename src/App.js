import { Route, BrowserRouter, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./miscellanous/GlobalTheme";
import { routes } from "./miscellanous/Routes";
import "./index.css";
import StartPage from "./components/startPage/StartPage";
import Auth from "./components/account/auth";
import News from "./views/News";
import User from "./views/User";
import EditProfile from "./components/editProfile/EditProfile";
import Groups from "./views/Groups";
import Albums from "./views/Albums";
import Search from "./views/Search";
import AlbumDetails from "./views/AlbumDetails";
import AlbumCreator from "./components/albumCreator/AlbumCreator";
import NotFound from "./views/NotFound";
import ErrorBoundary from "./templates/ErrorBoundary";


function App() {
	return (
    	<ThemeProvider theme={theme}>
			<ErrorBoundary>
				<BrowserRouter>
					<Switch>
						<Route exact path={routes.startPage} component={StartPage}/>
						<Route exact path={routes.auth} component={Auth}/>   
						<Route exact path={routes.news} component={News}/>
						<Route exact path={routes.user} component={User}/>
						<Route exact path={routes.editProfile} component={EditProfile}/>
						<Route exact path={routes.search} component={Search}/>
						{ /* /user/albums - taki powinien być url */ }
						<Route exact path={routes.albums} component={Albums}/>
						<Route exact path={routes.album} component={AlbumDetails}/>
						<Route exact path={routes.albumCreator} component={AlbumCreator}/>
						<Route exact path={routes.groups} component={Groups}/>
						<Route path="*" component={NotFound}/>
					</Switch>
				</BrowserRouter>
			</ErrorBoundary>
    	</ThemeProvider>
  	);
}

export default App;
