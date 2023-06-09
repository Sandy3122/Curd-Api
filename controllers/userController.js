const User = require("../models/user.js");
const { v4: uuidv4 } = require('uuid');

//Get All Products
const getAllUsers = async(req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

//Get Single User By Using Id
const getUser = async(req, res) =>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: `Cannot Find Any User With ID ${userId}`});
          }
        
        res.status(200).json(user);
        console.log(user);
    } catch (error) {
        res.json({ message: error });
        res.status(500).json({message: error.message})
    }
};

//Creating New User
const createUser = async (req, res) => {
    try {
      const user = new User({
        id: uuidv4(), // Generate a new uuidv4 identifier for the user
        username: req.body.username,
        age: req.body.age,
        hobbies: req.body.hobbies,
      });
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

//Update User
const updateUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndUpdate(userId, req.body);
        // we cannot find any user in database
        if(!user){
            return res.status(404).json({message: `Cannot Find Any User With ID ${userId}`})
        }
        const updatedUser = await User.findById(userId);
        console.log(updatedUser)
        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
};


//Delete User
const deleteUser = async(req, res) =>{
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({message: `Cannot Find Any User With ID ${userId}`})
        }
        const deletedUser = await User.deleteOne({_id: req.params.id});
        console.log(deletedUser)
        res.status(200).json({message: "User Deleted Successfully"});
        // res.status(200).json(deletedUser);
        // res.status(204).end();

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

//Exporting User Modules
module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
}