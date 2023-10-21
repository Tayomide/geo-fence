import { createContext } from "react";

const AppContext = createContext({
  isEditing: false,
  setIsEditing: () => {},
  editingIdx: -1,
  setEditingIdx: () => {},
  editSvg: [],
  setEditSvg: () => {},
  svgList: [],
  setSvgList: () => {},
  // Authentication
  token: null,
  setToken: () => {},
  tokenExpiration: null,
  setTokenExpiration: () => {},
  boundaries: [],
  setBoundaries: () => {},
  isDeleting: false,
  setIsDeleting: () => {},
  globalPoints: {
    points: [],
    adding: false
  },
  setGlobalPoints: () => {}
})

export default AppContext