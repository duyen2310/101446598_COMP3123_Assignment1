const express = require("express");
const employeeModel = require("../models/employeeModel");
const router = express.Router();
const mongoose = require('mongoose')

//create employess
router.post("/employees", async (req, res) => {
    const empData = req.body;
    console.log(empData);
    
    try {
        const emp = new employeeModel(empData);
        const newEmp = await emp.save();
        res.status(201).send({ message: "Employee created successfully.", employee: newEmp.id });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
//get the list
router.get("/employees", async (req, res) => {
    employeeModel.find().then((emp) => {
        res.send(emp)
    }).catch((err) => {
        res.status(500).send({message: err.message})
    })
});
router.put("/employees/:employeeid", async (req, res) => {
    const updateData = {
        ...req.body,
        updated_at: new Date() // Add updated_at to the update data
    };

    const emp = await employeeModel.findByIdAndUpdate(req.params.employeeid, updateData, { new: true })
    .then((emp) => {
            if(emp){
                res.send({"message": "Employee details updated successfully.", employee: emp.id})
            } else{
                res.status(404).send({message:"Employee not found"})
            }
        }).catch((error) => {
            res.status(500).send({message: error.message})
        })
});


router.delete("/employees/", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.query.eid)) {
            return res.status(400).send('Invalid ID format');
        }

        const curr_user = await employeeModel.findOneAndDelete({ _id: req.query.eid })

        if (!curr_user) {
            return res.status(400).send('Employee not found')
        }
        res.send({"message": "Employee deleted successfully."})
    } catch (e) {
        res.status(500).send(e)
    }
});


module.exports = router;
