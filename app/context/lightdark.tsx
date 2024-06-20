"use client";

import { useReducer, createContext } from "react";

type StateType = {
  sidebar: Boolean;
};

type SidebarToogleType = {
  type: "SIDEBAR_TOGGLE"
}

type ActionType = SidebarToogleType;
const INITIAL_STATE = {
  sidebar: false
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SIDEBAR_TOGGLE":
      return {

        ...state,
        sidebar: state.sidebar === false ? true : false
      }
    default:
      return state;
  }
};

export const ThemeContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({ state: INITIAL_STATE, dispatch: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
