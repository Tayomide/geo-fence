import { createContext } from "react";

const AppContext = createContext({
  // Authentication
  token: null,
  setToken: () => {},
  tokenExpiration: null,
  setTokenExpiration: () => {},
  loggedIn: false,
  setLoggedIn: () => {}
})

export default AppContext