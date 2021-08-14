import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import ThemeProvider from "./contexts /ThemesContext";
import { UserContext } from "./contexts/userContext";
import GlobalStyle from "./styles/globalstyles";

//Routes
import Index from "./pages/Index";

const hist = createBrowserHistory();

export default function Routes() {
  const { dispatch: userDispatch, state: { authenticated } } = useContext(UserContext)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return false
    };

    // authenticate(token)

  }, [])

  // async function authenticate(token) {
  //   api.post('/api/auth', null, {
  //     headers: {
  //       token: token
  //     }
  //   }).then(({ data }) => {
  //     if (data) {
  //       userDispatch({
  //         type: 'setUser',
  //         payload: {
  //           authenticated: true,
  //           accessToken: token,
  //           ...data
  //         }
  //       })
  //     }
  //   }).catch(e => {
  //     userDispatch({
  //       type: 'setUser',
  //       payload: {
  //         authenticated: false,
  //       }
  //     })
  //   })
  // }

  return (
    <ThemeProvider>
      <GlobalStyle />

      <Router history={hist}>
        <Switch>


          <Route path="/" exact component={Index} />
          <Route path="*">
            <Redirect to="/" />
          </Route>

        </Switch>
      </Router>

    </ThemeProvider>
  );
}
