const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
//Route Get api/auth
//@desc Test Router
//@access Public or Private


//Protected route with auth middleware
router.get('/', auth, (req,res) => res.send('Auth Route'));

module.exports = router;
