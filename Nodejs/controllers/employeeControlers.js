const express = require('express')
var router = express.Router()
var { Employee } = require("../models/employee")
var ObjectId = require('mongoose').Types.ObjectId
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log("error in retriving employee " + JSON.stringify(err, undefined, 2));
        }
    });
})
router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log("error in employee save" + JSON.stringify(err, undefined, 2))
        }
    })
})
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record woth this id : ${req.params.id}`)
    Employee.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log("error in employee save" + JSON.stringify(err, undefined, 2))
        }
    })
})
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record woth this id : ${req.params.id}`)
    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log("error in employee update" + JSON.stringify(err, undefined, 2))
        }
    })
})
router.delete('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`no record woth this id : ${req.params.id}`)
    Employee.findOneAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log("error in employee Delete" + JSON.stringify(err, undefined, 2))
        }
    })
})
module.exports = router