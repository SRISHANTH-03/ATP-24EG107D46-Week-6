import exp from "express";
import { EmpModel } from "../models/Employeeinfo.js";

export const empRoute = exp.Router();

// CREATE employee
empRoute.post("/employees", async (req, res, next) => {
  try {
    const newEmp = req.body;
    const empDoc = new EmpModel(newEmp);

    await empDoc.save();

    res.status(201).json({ message: "Employee created" });
  } catch (err) {
    next(err);
  }
});

// READ all employees
empRoute.get("/employees", async (req, res, next) => {
  try {
    const empList = await EmpModel.find();

    res.status(200).json({
      message: "List of employees",
      payload: empList,
    });
  } catch (err) {
    next(err);
  }
});

// READ employee by ID 
empRoute.get("/employees/:id", async (req, res, next) => {
  try {
    const emp = await EmpModel.findById(req.params.id);

    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ payload: emp });
  } catch (err) {
    next(err);
  }
});

// UPDATE employee
empRoute.put("/employees/:id", async (req, res, next) => {
  try {
    const modifiedEmp = req.body;

    const updatedEmp = await EmpModel.findByIdAndUpdate(
      req.params.id,
      { $set: { ...modifiedEmp } },
      { returnDocument: "after" } 
    );

    if (!updatedEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated",
      payload: updatedEmp,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE employee
empRoute.delete("/employees/:id", async (req, res, next) => {
  try {
    const deletedEmp = await EmpModel.findByIdAndDelete(req.params.id);

    if (!deletedEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted",
      payload: deletedEmp,
    });
  } catch (err) {
    next(err);
  }
});