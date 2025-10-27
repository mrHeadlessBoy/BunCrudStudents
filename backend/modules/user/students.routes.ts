import Router from "express";
import student_controller from "../students.controller"

const router = Router();

router.get('/', student_controller.getStudents);
router.post('/', student_controller.addStudent);
router.get('/:id', student_controller.getStudentById);
router.put('/:id', student_controller.updateStudent);
router.delete('/:id', student_controller.removeStudent);

export default router;