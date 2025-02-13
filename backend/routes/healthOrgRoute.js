const express = require('express')
const { authenticateHealthOrg } = require('../middleware/authMiddleware')
const { healthOrgSignin, addDoctor, getDoctors, getPatient, registerHospital } = require('../controller/healthorg.controller')
const router = express.Router()
const upload = require("../config/multerConfig.js");

router.post('/registerHospital',upload.single("certificate"),registerHospital);
router.post('/signin',healthOrgSignin)
router.post("/add-doctor", authenticateHealthOrg, addDoctor);
router.get('/getDoctor',authenticateHealthOrg,getDoctors)
router.get('/getPatient',authenticateHealthOrg,getPatient)
module.exports = router