import React  from "react";

import SearchBar from './../search_bar/search_bar';
import NotesList from './../notes_list/notes_list';

import styleModule from './left_container.module.css';

const Left_Container  = () => {

    
    return (<div className={styleModule.leftContainer}>
             <h3 className={styleModule.titleMyNote}>My Notes</h3>
             <SearchBar />
             <NotesList /> 
          </div>)


};


export default Left_Container;