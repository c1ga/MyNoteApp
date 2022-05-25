import React from 'react';
import {useDispatch} from 'react-redux';
import {set_all_notes} from './../../Redux/myNotes_redux';
import {FETCH, CHECK_MOUNT_ACTION, CHECK_MOUNT_STATE} from './../methods';

import styleModule from './welcome.module.css';

const Welcome = () => {
       
      const dispatch = useDispatch();
      const [renderData, setRenderData] = React.useState(<div className={styleModule.welcomeContainer}>
                                                              <p>Welcome To Your Note App</p>
                                                         </div>);
      const MountModule = React.useRef({status: true});
      const abortController = new AbortController();

    React.useEffect(() => {
        MountModule.current.status = true;
          FUNCTION1();
          return () => {
            MountModule.current.status = false;
            abortController.abort();
          };
    }, []);
  
    //GET NOTES FROM SERVER ==================
    const FUNCTION1 = async() => {
        try{
          setTimeout(() => {
              CHECK_MOUNT_STATE(MountModule.current.status, setRenderData, ''); 
          }, 2000);  
          let res = await FETCH('http://localhost:5000/mynotes');
          if(res.error){
            CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_all_notes ,'Failed To Fetch Notes');
          }else if(res.success){
            CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_all_notes, res.success);
          }else{
            CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_all_notes ,'Failed To Fetch Notes');
          };
        }catch(e){
          CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_all_notes ,'Failed To Fetch Notes');
        };
    };
    //GET NOTES FROM SERVER ==================


     return renderData;

};

export default Welcome;
