import express from 'express';
import { getProject } from '../controllers/project.ctrl';

const router = express.Router();

router.get('/project-list', getProject)
// router.get('/:email/project-list', getProjectsByEmployeeEmail)

// router.put('/:id', updateProject)
// router.post('/', createProject)
// router.delete('/:id', deleteProject)




export default router;


