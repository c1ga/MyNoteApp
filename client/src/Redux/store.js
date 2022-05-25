import {configureStore} from '@reduxjs/toolkit';
import MyNotes from './myNotes_redux';


export default configureStore({
    reducer: {
      MyNotes:  MyNotes
    }
})