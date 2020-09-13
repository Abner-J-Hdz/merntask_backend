const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');


router.get('/',(req, res) =>{
    //console.log(req.params.id);
    console.log(req.body);
    res.status(200).send({msg: "no se que pasas", datos: req.body});
});

module.exports = router;