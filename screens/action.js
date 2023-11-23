export const setNote = (note) =>{
    return {
        type: "SET_NOTE",
        payload: note,
    };
}

export const deleteNote = (note) =>{
    return{
        type: "DELETE_NOTE",
        payload: note,
    };
}

export const updateNote = (oldNote, newNote) =>{
    return {
        type: "UPDATE_NOTE",
        payload:{
            oldNote,
            newNote,
        }
    }
}
export const addNote = (note) => {
    return {
      type: "ADD_NOTE",
      payload: note,
    };
  };