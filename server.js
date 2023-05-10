const express = require("express");
const mongoose = require("mongoose");
const dotenv =  require("dotenv");
const { v4: uuidv4 } = require('uuid');
const app = express();

const User = require("./models/user.js") //Importng User Model

dotenv.config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Importing Routes
const userRoutes = require("./routes/userRoutes.js")

//Route Middlewares
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
  res.send("Hello Node API")
});

//Handling Requests For Non-Existing Endpoints
app.use((req, res, next)=>{
  res.status(404).send({message:"Hey! Please double-check the API endpoint."});
});

// const cluster = require("cluster")

// const os = require("os");

// const numCpu = os.cpus().length;

// app.get('/', (req, res) => {
//     for(let i = 0; i < 1e8; i++){
//         //Some Long Runnng Task
//     }
//     res.send(`OK ${process.pid}`);
//     // cluster.worker.kill();
// });


// if(cluster.isMaster){
//     for(let i = 0; i < numCpu; i++){
//         cluster.fork()
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker${worker.process.pid} died`);
//         cluster.fork()
//     })
// } else{
//     app.listen(4000, () => console.log(`server ${process.pid} @ http://localhost:4000`));
// }



//MongoDB Connection

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MongoDB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully Connected To MongoDB Database.");
  })
  .catch((error) => {
    console.log(`Not Connected To MongoDB Database; Error : ${error}`);
  });

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`${PORT} server @ http://localhost:4000`))