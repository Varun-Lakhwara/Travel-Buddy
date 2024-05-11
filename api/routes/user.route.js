let express = require ('express');
const test  = require('../controllers/user.controller.js');
const updateUser = require('../controllers/user.controller.js');
const verifyToken = require('../utils/verifyUser.js');
const deleteUser = require('../controllers/user.controller.js');
const signout = require('../controllers/user.controller.js'); 
const getUsers = require('../controllers/user.controller.js');


const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);

module.exports = router;
 