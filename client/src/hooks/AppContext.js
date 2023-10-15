import { createContext } from "react";

const AppContext = createContext({
  isEditing: false,
  setIsEditing: () => {},
  editingIdx: -1,
  setEditingIdx: () => {},
  editSvg: {},
  setEditSvg: () => {},
  svgList: [],
  setSvgList: () => {}
})

export default AppContext