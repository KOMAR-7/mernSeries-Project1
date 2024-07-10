const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/project1DB')
// const URI = 'mongodb://localhost:27017/project1DB'
// const URI = "mongodb+srv://forchegg80:omar123@omarcluster.im5ijmw.mongodb.net/project1DB?retryWrites=true&w=majority&appName=omarcluster"
const URI = process.env.MONGODB_URI



// mongoose.connection.on('connected',()=>{
//     console.log("Connected to mongodb")
// })

// mongoose.connection.on('error',(err)=>{
//     console.log("Error: ", err)
// })

const connectDb = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connection Successfully")
    } catch (error) {
        console.log("Error: ", error)
    }
}
module.exports = connectDb;