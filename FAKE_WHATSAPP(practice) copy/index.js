const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js')
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js")

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))

main().then(()=>{
    console.log("connection successful");
})
.catch((err)=> console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp'); 
}
// index route 

app.get("/chats",async (req,res)=>{
    try{
    let chats = await Chat.find()
    console.log(chats);
    res.render('index.ejs',{chats});
    } catch(err){
        next(err);
    } 
})

// New Route

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
   // throw new ExpressError(404,"page not found");
    
})

//Create Route 

app.post('/chats',(req,res)=>{
    let {from ,to, msg} = req.body;
    let newChat = new Chat ({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    })
    newChat.save().then((res)=>{
        console.log(res);
    }).catch((e)=>{
        console.log(e);
    });
    res.redirect('/chats');
})

//show Route
app.get("/chats/:id",async(req,res,next)=>{
    try {
        let {id} = req.params;
        let chats = await Chat.findById(id);
        res.render("edit.ejs",{chats});
    } catch(err){
        next(err);
    }
});

//Edit Route

app.get("/chats/:id/edit",async (req,res)=>{
    try{
        let {id} = req.params;
        let chat = await Chat.findById(id)
        res.render("edit.ejs",{chat});
    } catch(err) {
        next(err);
    }
})

// Update Route

app.put("/chats/:id",async (req,res)=>{
    try{
        let {id} = req.params;
        let {msg : newMsg} = req.body;
        let updateChat = await Chat.findByIdAndUpdate
        (id,{msg:newMsg},
            {runValidators : true, new: true}
        );
        console.log(updateChat)
        res.redirect("/chats")
    }  catch(err){
       next(err);
       }
});

//Delete Route

app.delete("/chats/:id",async (req,res)=>{
    try{
        let {id} = req.params;
         let deletedChat = await Chat.findByIdAndDelete(id)
         console.log(deletedChat)
         res.redirect("/chats")
     }catch(err){
        next(err);
     } 
});

app.get('/', (req, res) => {
    res.send('working root!');
});

app.use((err,req,res,next)=>{
    let {status=500,message="some error occured"} = err;
    res.send(status).send(message);
});

app.listen(8080,()=>{
    console.log('server is listening on port 8080')
});