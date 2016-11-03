const mongoose = require('mongoose');
const Employee = require('../models/employee');


exports.createEmployee = function (req, res, next) {
  const { name } = req.body;
  const { phone } = req.body;
  const { shift } = req.body;

  const employee = new Employee({ creator: req.body.userId, name, phone, shift });

  employee.save(err => {
    if (err) { return next(err); }
    res.status(200).json({ employee });
  });
};

exports.fetchAll = function (req, res, next) {
  const { userId } = req.params;

  Employee.find({ creator: userId }, (err, employees) => {
      if (err) { return next(err); }
      res.status(200).json(employees);
  });
};

exports.editEmployee = function (req, res, next) {
  const { id } = req.body;
  const { name } = req.body;
  const { phone } = req.body;
  const { shift } = req.body;
  const { userId } = req.body;

  Employee.findOne({ _id: id, creator: userId }, (err, employee) => {
      if (err) { return next(err); }

      const employeeToUpdate = employee;
      employeeToUpdate.name = name;
      employeeToUpdate.phone = phone;
      employeeToUpdate.shift = shift;

      // save employee with updated properties
      employee.save(error => {
				// check for save error
				if (error) { return next(error); }
				// return the employee with updated info
				res.status(200).json(employeeToUpdate);
			});
  });
};

// add check to see if employee belongs to logged in user
// pull logged in user's Id from authenticate middleware
exports.deleteEmployee = function (req, res, next) {
  const { id } = req.params;

  Employee.findByIdAndRemove({ _id: id }, (err, employee) => {
      if (err) { return next(err); }

      // if no employee with the given ID is found throw 404
      if (!employee) {
        res.status(404).json('No employee with that ID');
      } else {
        res.status(200).json(employee);
      }
  });
};
