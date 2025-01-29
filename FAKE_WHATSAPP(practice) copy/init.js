const mongoose = require('mongoose');
const Chat = require('./models/chat.js')

main().then(()=>{
    console.log("connection successful");
})
.catch((err)=> console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp'); 
}

let allChats = [
    {
    from : "neha",
    to : "priya",
    msg : 'Send me your Exam Sheet',
    created_at : new Date()
    },
    {
        from : "Ayush",
        to : "Jenil",
        msg : 'Send me your number',
        created_at : new Date()
    },
    {
        from : "Jenil",
        to : "Hatim",
        msg : 'Are you coming today',
        created_at : new Date()
    },
    {
        from : "Simran",
        to : "Sahil",
        msg : 'Coordinate Ho gaya',
        created_at : new Date()
    }
]

Chat.insertMany(allChats)