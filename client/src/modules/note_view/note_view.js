import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {delete_note, set_note_on_view, set_search_notes} from './../../Redux/myNotes_redux';
import {FETCH, CHECK_MOUNT_ACTION, CHECK_MOUNT_STATE} from './../methods';

import styleModule from './note_view.module.css';

const Note_View = () => {

    const dispatch = useDispatch();
    const {viewNote, myNotes, searchNotes} = useSelector(state => state.MyNotes);
    const [noteView, setNoteView] = React.useState('');
    const MountModule = React.useRef({status: true});

    React.useEffect(() => {
        MountModule.current.status = true;
        FUNCTION0();
        return () => MountModule.current.status = false;
    }, [viewNote, myNotes, searchNotes]);

    //DELETE NOTE FROM SEARCH NOTES =========
    const FUNCTION3 = () => {
        if(searchNotes.notesList){
            let noteToDelete;
            for(let i=0;i<searchNotes.notesList.length;i++){
                if(searchNotes.notesList[i].date === viewNote.date){
                    noteToDelete = searchNotes.notesList[i];
                };
            };
            if(noteToDelete){
                let noteClone = searchNotes.notesList.filter(n => n.date !== viewNote.date);
                CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_search_notes, {notesList: noteClone});              
            };
        };
    }
    //DELETE NOTE FROM SEARCH NOTES =========

    //CLOSE NOTE ============================
    const FUNCTION2 = () => {
      CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_note_on_view, {});
    };
    //CLOSE NOTE ============================
    
    //DELETE NOTE ===========================
    const FUNCTION1 = async(e) => {
        let msgEl = document.querySelector(`.${styleModule.smbMsg}`);
        try{
            //DELETE FIRST ON SERVER
            var res = await FETCH('http://localhost:5000/rmnote', {myNote: viewNote});
            if(res.error){
                msgEl.style = 'color:red';
                msgEl.textContent = `Server Message ${res.error}`;
            }else{
                msgEl.textContent = `Server Message ${res.success}`;
            };
            setTimeout(() => {
              if(MountModule.current.status && msgEl){
                  msgEl.style = '';
                  msgEl.textContent = '';
                  let myNotesClone = myNotes.filter((n, i) => i !== viewNote.ind);
                  FUNCTION2();
                  CHECK_MOUNT_ACTION(MountModule.current.status,  dispatch, delete_note, myNotesClone);
                  FUNCTION3();
              };
            }, 2000);
       }catch(e){
            let myNotesClone = myNotes.filter((n, i) => i !== viewNote.ind);
            FUNCTION2();
            CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, delete_note ,myNotesClone);
            FUNCTION3();
       };
    };
    //DELETE NOTE ===========================

    //CREATE NOTE VIEW ======================
    const FUNCTION0 = () => {
        if(viewNote.title){
            CHECK_MOUNT_STATE(MountModule.current.status,setNoteView, (<div className={styleModule.viewNoteContainer}>
                     <div className={styleModule.noteDescription}>
                      <h2>Title: {viewNote.title}</h2>
                      <h3>Cateogry: {viewNote.category}</h3>
                      <h4>Date: {`${new Date(viewNote.date).toLocaleDateString()}/${new Date(viewNote.date).getHours()}:${new Date(viewNote.date).getMinutes()}`}</h4>
                      <p className={styleModule.noteTextContainer}>{viewNote.note}</p>
                     </div>
                     <p className={styleModule.smbMsg}></p>
                     <div className={styleModule.actionsNote}>
                         <div className={styleModule.delBtn} onClick={FUNCTION1}>Delete Note</div>
                         <div onClick={FUNCTION2}>Close Note</div>
                     </div>
                  </div>));
         }else{
            CHECK_MOUNT_STATE(MountModule.current.status, setNoteView, '');
         };
    };
    //CREATE NOTE VIEW ======================

    return noteView;

}

export default Note_View;