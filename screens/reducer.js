const initialState = {
  note: [
 
  ],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTE":
      return {
        ...state,
        note: [...state.note, ...action.payload], 
      };
    // case "SET_NOTE":
    //   return {
    //     ...state,
    //     note: action.payload,
    //   };
    case "ADD_NOTE":
        return {
          ...state,
          note: [...state.note, action.payload],
        };
    case "DELETE_NOTE":
      return {
        ...state,
        note: state.note.filter((note) => note.id !== action.payload.id),
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        note: state.note.map((note) => {
          if (note.id === action.payload.oldNote.id) {
            return {
              ...note,
              ...action.payload.newNote,  
            };
          }
          return note;
        }),
      };

      
    default:
      return state;
  }
};
export default noteReducer;
