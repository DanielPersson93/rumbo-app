import express from 'express';
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../controllers/employee.ctrl';

const router = express.Router();

router.get('/', getEmployees)
// router.get('/', async (req, res) => {
//     const employees = await getEmployees();
//     res.json(employees);
//   })
// router.put('/:id', updateEmployee)
// router.post('/', createEmployee)
// router.delete('/:id', deleteEmployee)

export default router;
