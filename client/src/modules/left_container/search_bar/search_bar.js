import React  from "react";
import {useSelector, useDispatch} from 'react-redux';
import {set_search_notes} from './../../../Redux/myNotes_redux';
import {CHECK_MOUNT_ACTION, CHECK_MOUNT_STATE} from './../../methods';

import styleModule from './search_bar.module.css';

const SearchBar = () => {

    const {myNotes} = useSelector((state) => state.MyNotes);
    const dispatch = useDispatch();
    const [searchBar, setSearchBar] = React.useState('');
    const MountModule = React.useRef({status: true});


    React.useEffect(() => {
        MountModule.current.status = true;
        FUNCTION0();
        return() => MountModule.current.status = false;
     }, [myNotes]);

    //SEARCH FUNCTION ================
    const FUNCTION1 = (e) => {
      if(myNotes.length > 0){
        let notesFound = []; 
        if(e.target.value.trim().length > 0){
           let regExp = new RegExp(`^${e.target.value}`, 'i');
           for(let i=0;i<myNotes.length;i++){
               if(regExp.test(myNotes[i].category)){
                   notesFound.push(myNotes[i]);
               };
           };
           CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_search_notes, {notesList: notesFound});
        }else{
           CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_search_notes,notesFound);
        };
      };
    };
    //SEARCH FUNCTION ================

    //CREATE SEARCH ==================
    const FUNCTION0 = () => {
        CHECK_MOUNT_STATE(MountModule.current.status, setSearchBar, (
            <div className={styleModule.searchContainer}>
                <hr/>
                <div className={styleModule.searchBar}>
                    <input type="text" placeholder="Search Your Notes"
                     onChange={FUNCTION1}
                     onBlur={(e) => {
                         if(e.currentTarget.value.trim().length < 1){
                            CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_search_notes, {});
                         }
                     }}
                    />
                </div>
                <hr/>
             </div>)
        );
    };
    //CREATE SEARCH ==================


    return searchBar;

};

export default SearchBar;