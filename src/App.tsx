import './App.css'

import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  dob: string;
}

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ name: "", email: "", age: "", dob: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_BASE = "/api/v1/students/";

  // Fetch all students
  const fetchStudents = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update student
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`${API_BASE}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditingId(null);
    } else {
      await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", email: "", age: "", dob: "" });
    fetchStudents();
  };

  // Edit student
  const handleEdit = (student: Student) => {
    setForm({
      name: student.name,
      email: student.email,
      age: student.age.toString(),
      dob: student.dob,
    });
    setEditingId(student.id);
  };

  // Delete student
  const handleDelete = async (id: number) => {
    await fetch(`${API_BASE}${id}`, { method: "DELETE" });
    fetchStudents();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students CRUD App</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      {/* Students List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Age</th>
            <th className="border px-2 py-1">DOB</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="border px-2 py-1">{s.id}</td>
              <td className="border px-2 py-1">{s.name}</td>
              <td className="border px-2 py-1">{s.email}</td>
              <td className="border px-2 py-1">{s.age}</td>
              <td className="border px-2 py-1">{s.dob}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
