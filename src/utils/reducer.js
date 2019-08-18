

export const reducer = (state, action) => {
    switch (action.type) {
        case 'changeLocation':
            return {
                ...state,
                chosenLocation: action.location
            };
        case 'toggleWindow':
            return {
                ...state,
                windows: {
                  ...state.windows,
                 [action.id]: {
                      ...state.windows[action.id],
                      isOpen: action.isOpen
                  }
                }
            };

        default:
            return state;
    }
};