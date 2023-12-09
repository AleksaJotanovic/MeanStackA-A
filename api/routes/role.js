import express from 'express';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Kreiraj novu ulogu u bazi.
router.post("/create", verifyAdmin, createRole);

router.put('/update/:id', verifyAdmin, updateRole);

router.get('/get-all', getAllRoles);

router.delete('/delete/:id', deleteRole);

export default router;