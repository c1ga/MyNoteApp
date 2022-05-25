
const CHECK_MOUNT_STATE = (status, method, data) => {
     if(status){
         method(data);
     };
};

const CHECK_MOUNT_ACTION = (status, dispatch, method, data) => {
   if(status){
       dispatch(method(data));
   };
};


const FETCH = async(url, data) => {
   try{       
    if(data){
        var res = await fetch(url, {
            method: 'POST',
            mode:   'cors',
            headers: {'Accept': 'application/json',
                     'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if(res.status === 200){
            var resJson = await res.json();
            return resJson.error ? {error: resJson.error} : resJson.success ? {success: resJson.success} : {error: 'Uncorrect Server Respond'};
        }else{
            return {error: 'Failed'};     
        };
    }else{
        var res = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        });
        if(res.status === 200){
            var resJson = await res.json();
            if(resJson.success && resJson.success.myNotes){
                return {success : resJson.success.myNotes};
            }else{
                return {error: 'Failed To Fetch Notes'};
            }
        }else{
            return {error : "Failed"};
        };
    };
  }catch(e){
      console.log(e);
      return {error: 'Failed'}
  };

};


export {CHECK_MOUNT_ACTION, CHECK_MOUNT_STATE, FETCH};


