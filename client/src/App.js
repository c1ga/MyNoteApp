import React from "react";
import styleModule from './myApp.module.css';

import Welcome from './modules/welcome_/welcome';
import LeftContainer from './modules/left_container/container/left_container';
import CreateNote from './modules/create_notes/create_notes';
import ViewNote from './modules/note_view/note_view';

function App() {
  return (
    <div className={styleModule.myAppContainer}>
       <Welcome />
       <LeftContainer />
       <div className={styleModule.splitRow}></div>
       <CreateNote />
       <ViewNote/>
    </div>
  );
}

export default App;
