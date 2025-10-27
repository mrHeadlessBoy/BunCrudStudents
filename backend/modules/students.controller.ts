import { Request, Response } from "express";
import pool from "../config/database";
import queries from "./user/students.queries"; 

/*  วิธีเขียนนี้เรียก call back อาจจะอ่านยากแต่เขียนง่ายเร็ว
    const getStudents = (_req: Request, res: Response) => {
    pool.query("SELECT * FROM students", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    console.log('getting students');
    });
}; */

const getStudents = async (req: Request, res: Response) => {
    try {
        const results = await pool.query(queries.getStudents);
        res.status(200).json(results.rows);
        console.log('getting students');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getStudentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id); // ส่ง params ข้อมูลมา

        const results = await pool.query(queries.getStudentById, [id]); // รับ params ข้อมูลมา (id)
        
        if (results.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(results.rows);
    } catch (error) {
        console.error("Error fetching student by ID:", error); //ดัก error และ บอกข้อมูลเต็มๆของ , error)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

    const addStudent = async (req: Request, res: Response) => {
    try {
        const { name, email, age, dob } = req.body;
        // Check if email already exists
        const existing = await pool.query(queries.checkEmailExits, [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Email already exists." });
        }
        // Add student
        const insertResult = await pool.query(queries.addStudent, [name, email, age, dob]);
        res.status(201).json({
            message: "Student added successfully!",
            data: insertResult.rows[0] || { name, email, age, dob }
        });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const removeStudent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const results = await pool.query(queries.removeStudent, [id]);

    // if no rows affected, student doesn't exist
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student removed successfully" });

  } catch (error) {
    console.error("Error removing student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

 /*    // Validate input
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
 */
    // Check if student exists
    const existing = await pool.query(queries.getStudentById, [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the student
    await pool.query(queries.updateStudent, [name, id]);

    res.status(200).json({ message: "Student updated successfully" });

  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export default { getStudents, getStudentById, addStudent, removeStudent, updateStudent } ;