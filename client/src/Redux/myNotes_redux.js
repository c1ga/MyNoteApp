import {createSlice} from '@reduxjs/toolkit';


export const myNotes = createSlice({
    name: 'MyNotes',
    initialState: {
       myNotes: [],
       searchNotes: {},
       viewNote: {}
    },
    reducers: {
           set_all_notes: (state, action) => {
             state.myNotes = action.payload;
           },
           set_note: (state, action) => {
             state.myNotes.push(action.payload);
           },
           set_search_notes: (state, action) => {
            state.searchNotes = action.payload;
           },
           set_note_on_view : (state, action) => {
                state.viewNote = action.payload
           },
           delete_note: (state, action) => {
             state.myNotes = action.payload;
           }

    },

})


export const {set_all_notes, set_note, set_search_notes, set_note_on_view, delete_note} = myNotes.actions;


export default myNotes.reducer;
