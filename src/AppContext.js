import React, {createContext, useContext, useReducer} from 'react';
export const StateContext = createContext();
export const StateProvider = (props) => {
  const {reducer, initialState, children} = props;
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);
