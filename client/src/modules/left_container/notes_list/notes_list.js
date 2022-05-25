import React  from "react";
import {useSelector, useDispatch} from 'react-redux';
import {set_note_on_view, set_all_notes} from './../../../Redux/myNotes_redux';
import {CHECK_MOUNT_ACTION, CHECK_MOUNT_STATE} from './../../methods';


import styleModule from './notes_list.module.css';

const Notes_List = () => {

    const {myNotes, searchNotes, viewNote} = useSelector((state) => state.MyNotes); 
    const [notesList, setNotesList] = React.useState('');
    const MountModule = React.useRef({status: true});
    const dispatch = useDispatch();

    React.useEffect(() => {
      MountModule.current.status = true;
      FUNCTION0();
      return() => MountModule.current.status = false;
   },[myNotes, searchNotes, viewNote]);

    //ON CLICK LIST ==========================
    const FUNCTION1 = (data, ind ,e) => {
       let dataClone = Object.assign({}, data);
       dataClone.ind = ind;
       CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_note_on_view, dataClone);
    };
    //ON CLICK LIST ==========================

    //CREATE LIST ============================
    const FUNCTION0 = () => {
        if(myNotes === 'Failed To Fetch Notes'){
         CHECK_MOUNT_STATE(MountModule.current.status ,setNotesList, 
            (<div className={styleModule.notesListContainer}>
                 <h3 className={styleModule.emptyListMsg}>{myNotes}</h3>
              </div>)
         );
         setTimeout(() => {
            CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_all_notes, []);
         }, 5000);   
        }else if(searchNotes.notesList){
            CHECK_MOUNT_STATE(MountModule.current.status, setNotesList, 
                    (<div className={styleModule.notesListContainer}>
                         {
                            searchNotes.notesList.map((item, ind) => {
                                return(<div key={item.date} className={styleModule.noteItem}
                                         onClick={FUNCTION1.bind(null, item, ind)}
                                        >
                                           <p>Date: {`${new Date(item.date).toLocaleDateString()}/${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}`}</p>
                                           <h4>Category: {item.category}</h4>
                                           <h5>Title: {item.title}</h5>
                                           <i style={viewNote.ind === ind ? {backgroundColor: '#ffffff'} : {}}></i> 
                                       </div>);
                            })
                         }
                      </div>)
            );
       }else if(myNotes.length > 0){
            CHECK_MOUNT_STATE(MountModule.current.status,setNotesList, 
                    (<div className={styleModule.notesListContainer}>
                         {
                            myNotes.map((item, ind) => {
                                return(<div key={item.date} className={styleModule.noteItem}
                                    onClick={FUNCTION1.bind(null, item, ind)}
                                >
                                           <p>Date: {`${new Date(item.date).toLocaleDateString()}/${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}`}</p>
                                           <h4>Category: {item.category}</h4>
                                           <h5>Title: {item.title}</h5>
                                           <i style={viewNote.ind === ind ? {backgroundColor: '#ffffff'} : {}}></i> 
                                       </div>);
                            })
                         }
                      </div>)
            );
       }else{
        CHECK_MOUNT_STATE(MountModule.current.status, setNotesList, 
            (<div className={styleModule.notesListContainer}>
                 <h3 className={styleModule.emptyListMsg}>No Note Found</h3>
              </div>)
            );   
       }
    };
    //CREATE LIST ============================


    return  notesList;
    
};


export default Notes_List;