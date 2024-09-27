const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions ={
    origin:"http://localhost:4200"
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");
db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() =>{
    console.log("connected to database")
})
.catch(err =>{
    console.log("error connecting to database",err);
    process.exit();
})
// app.get("/",(req,res) => {
//     res.json({message: "Hello from server"});
// })

require("./app/routes/todo.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    })