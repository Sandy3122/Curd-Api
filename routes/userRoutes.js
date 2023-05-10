const router =  require("express").Router();
const userController = require("../controllers/userController.js");

//Creating User Routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


//Exporting User Routes
module.exports = router;