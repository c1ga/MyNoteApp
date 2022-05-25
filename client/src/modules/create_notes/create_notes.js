import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {set_note} from './../../Redux/myNotes_redux';
import {FETCH, CHECK_MOUNT_STATE, CHECK_MOUNT_ACTION} from './../methods';

import styleModule from './create_notes.module.css';

const Create_Notes = () => {

    const NoteView = useSelector(state => state.MyNotes.viewNote);
    const [formData, setFormData] = React.useState({title: '', category: '', date: '', note: ''});
    const [viewNote, setViewNote] = React.useState('');
    const dispatch = useDispatch();
    const MountModule = React.useRef({status: true});
    const abortController = new AbortController();

    React.useEffect(() => {
        MountModule.current.status = true;
            FUNCTION0();
        return() => {
            MountModule.current.status = false;
            abortController.abort();
        }
     }, [NoteView, formData]);

    //ON BLUR =========================
    const FUNCTION1 = (e) => {
        e.target.classList.remove(styleModule.warningField)
      };
    //ON BLUR =========================

    //ON CHANGE INPUT =================
    const FUNCTION2 = (prop, e) => {
       if(MountModule.current.status){
           let formDataClone = Object.assign({}, formData);
           formDataClone[prop] = e.target.value;
           CHECK_MOUNT_STATE(MountModule.current.status, setFormData, formDataClone);
       };
    };
    //ON CHANGE INPUT =================

    //SET DATA TO BACKEND =============
    const FUNCTION3 = async(e) => {
    try{
        var msgEl = e.target.previousElementSibling;
        let pass = true;
        for(let prop in formData){
            if(!formData[prop]){
                pass = false;
                document.getElementsByName(prop)[0].classList.add(styleModule.warningField);
            };
        };
        formData.date = Date.now(formData.date);
        if(pass){ 
            var res = await FETCH('http://localhost:5000/mynote', {myNote: formData});  
            if(res.success){
                msgEl.textContent =`Server Message ${res.success}`;
            }else{
                msgEl.style = 'color:red';
                msgEl.textContent = `Server Message ${res.error}`;
            };
            setTimeout(() => {
                if(msgEl){
                    msgEl.style = '';
                    msgEl.textContent = '';
                };
            }, 3000);
            CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_note, formData);
            CHECK_MOUNT_STATE(MountModule.current.status, setFormData, {title: '', category: '', date: '', note: ''});
            if(document.querySelector(`.${styleModule.description}`)){
                document.querySelector(`.${styleModule.description}`).children[0].value = '';
            };
        }else{
            msgEl.style = 'color:red';
            msgEl.textContent = 'Please Complete Form';
            setTimeout(() => {
                if(msgEl){
                    msgEl.style = '';
                    msgEl.textContent = '';
                };
            }, 3000);
        };
    }catch(e){
        msgEl.style = 'color:red';
        msgEl.textContent = 'Failed To Insert Note To Server';
        setTimeout(() => {
            if(msgEl){
                msgEl.style = '';
                msgEl.textContent = '';
            };
        }, 3000);
        formData.date = Date.now(formData.date);
        CHECK_MOUNT_ACTION(MountModule.current.status, dispatch, set_note, formData);
        CHECK_MOUNT_STATE(MountModule.current.status, setFormData, {title: '', category: '', date: '', note: ''});
        if(document.querySelector(`.${styleModule.description}`)){
            document.querySelector(`.${styleModule.description}`).children[0].value = '';
         };
    };
        
    };
    //SET DATA TO BACKEND =============

    //FUNCTION TO RENDER FORM =========
    const FUNCTION0 = () => {
         CHECK_MOUNT_STATE(MountModule.current.status, setViewNote, (<div className={NoteView.title ? `${styleModule.CreateFormContainer} ${styleModule.NoteOnView}`: styleModule.CreateFormContainer}>
            <h3>Create You Note</h3>
            <div className={styleModule.formContainer}>
             <section>
                 <label>Date</label>
                 <input name="date" type="date" value={formData.date} 
                   onChange={FUNCTION2.bind(null, 'date')}
                   onFocus={FUNCTION1}
                 />
             </section>
             <section>
                 <label>Category</label>
                 <input name="category" type="text" value={formData.category} 
                   onChange={FUNCTION2.bind(null, 'category')}
                   onFocus={FUNCTION1}
                 />
             </section>

             <section>
                 <label>Title</label>
                 <input name="title" type="text" value={formData.title} 
                   onChange={FUNCTION2.bind(null, 'title')}
                   onFocus={FUNCTION1}
                 />
             </section>
             <section className={styleModule.description}>
                 <textarea name="note" type="text"
                   onBlur={FUNCTION2.bind(null, 'note')}
                   onFocus={FUNCTION1}
                 />
            </section>
            <p className={styleModule.smbMsg}></p>
            <section className={styleModule.sbmtBtn}
              onClick={FUNCTION3}
            >Save Note
            </section>
            </div>
         </div>));
    }
    //FUNCTION TO RENDER FORM =========



    return viewNote;


};

export default Create_Notes;