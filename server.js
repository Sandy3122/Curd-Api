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

app.get('/', (req, res) => {
    res.send("Hello Node API")
});

// //Getting All The Users
// app.get('/api/users', async(req, res) => {
//     try {
//         const user = await User.find({});
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// //Getting Users By Id
// app.get('/api/users/:id', async(req, res) =>{
//     try {
//         const {id} = req.params;
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User Not Found' });
//           }
        
//         res.status(200).json(user);
//         console.log(user);
//     } catch (error) {
//         res.json({ message: error });
//         res.status(500).json({message: error.message})
//     }
// })

// //Creating User
// app.post('/api/users', async (req, res) => {
//     try {
//       const user = new User({
//         id: uuidv4(), // Generate a new uuidv4 identifier for the user
//         username: req.body.username,
//         age: req.body.age,
//         hobbies: req.body.hobbies,
//       });
//       const savedUser = await user.save();
//       res.status(201).json(savedUser);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

// // update a product
// app.put('/api/users/:id', async(req, res) => {
//     try {
//         const {id} = req.params;
//         const user = await User.findByIdAndUpdate(id, req.body);
//         // we cannot find any user in database
//         if(!user){
//             return res.status(404).json({message: `Cannot Find Any User With ID ${id}`})
//         }
//         const updatedUser = await User.findById(id);
//         console.log(updatedUser)
//         res.status(200).json(updatedUser);
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//     }
// })

// // delete a product

// app.delete('/api/users/:id', async(req, res) =>{
//     try {
//         const {id} = req.params;
//         const user = await User.findByIdAndDelete(id);
//         if(!user){
//             return res.status(404).json({message: `Cannot Find Any User With ID ${id}`})
//         }
//         const deletedUser = await User.deleteOne({_id: req.params.id});
//         console.log(deletedUser)
//         res.status(200).json(`message: "User Deleted Successfully"`);
//         // res.status(200).json(deletedUser);

//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })


//Importing Routes
const userRoutes = require("./routes/userRoutes.js")

//Route Middlewares
app.use("/api/users", userRoutes);




const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`${PORT} server @ http://localhost:4000`))