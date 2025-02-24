import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:3000/api/categories/${editingCategory._id}`, { name: categoryName });
      } else {
        await axios.post("http://localhost:3000/api/categories", { name: categoryName });
      }
      setCategoryName("");
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Category Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
          <button type="submit" className="btn btn-primary">
            {editingCategory ? "Update" : "Add"} Category
          </button>
        </div>
      </form>
      <ul className="list-group">
        {categories.map((category) => (
          <li key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <div>
              <button onClick={() => { setCategoryName(category.name); setEditingCategory(category); }}
                className="btn btn-warning btn-sm me-2">
                Edit
              </button>
              <button onClick={() => handleDelete(category._id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
