const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors({origin: ['http://localhost:3000']}))


//REMOVE NOTES ===================
const FUNCTION2 = async (data) => {
    if(data.myNote && data.myNote.date){
       try{
        let myNotesFile = await fs.readFile('./myNotes.json');
        if(myNotesFile){
            let dataObj = JSON.parse(myNotesFile);
            if(dataObj.myNotes){
              dataObj.myNotes = dataObj.myNotes.filter((note) => note.date !== data.myNote.date);
              await fs.writeFile('./myNotes.json', JSON.stringify(dataObj));
              return {success: 'Note Deleted'}
            }else{
              return {error: 'Notes List Is Empty'};
            };      
        }else{
            return {error: 'Notes File Doesn\'t Exist!'};
        };
      }catch(e){
        return {error: 'Incorrect Data Input'};
      };
    }else{
        return {error: 'Incorrect Data Input'};
    };
 };               
 //REMOVE NOTES ===================

//INSERT NOTES ===================
const FUNCTION1 = async(data) => {

    if(data.myNote){
         try{
           let file = await fs.readFile('./myNotes.json');
           if(file){
               let dataObj = JSON.parse(file);
               if(dataObj.myNotes){
                   dataObj.myNotes.push(data.myNote);
                    await fs.writeFile('./myNotes.json', JSON.stringify(dataObj));
                    return {success: 'Note Inserted'};
               }else{
                    await fs.writeFile('./myNotes.json', JSON.stringify({myNotes: [data.myNote]}));
                    return {success: 'Note Inserted'};
               };
           }else{
                  await fs.writeFile('./myNotes.json', JSON.stringify({myNotes: [data.myNote]}));
                  return {success: 'Note Inserted'};
           };
         }catch(e){
            return {error: 'Note Insert Failed'}; 
         };
    }else{
        return {error: 'Incorrect Data Input'}
    };

}; 
//INSERT NOTES ===================

//GET NOTES ======================
const FUNCTION0 = async () => {
    try{
        let myNotesFile = await fs.readFile('./myNotes.json');
        return {success: JSON.parse(myNotesFile)};
    }catch(e){
         return {error: 'Failed To Get Notes'};
    };
};
//GET NOTES ======================


app.post('/rmnote', async(req, res) => {
    var fileDeleteMsg = await FUNCTION2(req.body);
        res.end(JSON.stringify(fileDeleteMsg));
});

app.post('/mynote', async(req, res) => {
    var fileInsertMsg = await FUNCTION1(req.body);
    res.end(JSON.stringify(fileInsertMsg));
});

app.get('/mynotes', async(req, res) => {
        var myNotesFile = await FUNCTION0();
        res.send(JSON.stringify(myNotesFile));
})



app.listen(5000);



