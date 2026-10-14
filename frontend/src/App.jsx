
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/projects";

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  }, []);

  const clearForm = () => {
    setName("");
    setDescription("");
    setStatus("Active");
    setEditId(null);
  };

  const addProject = async () => {
    if (!name.trim()) {
      alert("Please enter project name");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, status }),
      });

      if (!response.ok) throw new Error("Failed to add project");

      const data = await response.json();
      setProjects((prev) => [...prev, data]);
      clearForm();
    } catch (error) {
      console.log(error);
      alert("Could not add project. Check backend.");
    }
  };

  const editProject = (project) => {
    setEditId(project._id);
    setName(project.name || "");
    setDescription(project.description || "");
    setStatus(project.status || "Active");
  };

  const updateProject = async () => {
    if (!name.trim()) {
      alert("Please enter project name");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, status }),
      });

      if (!response.ok) throw new Error("Failed to update project");

      const updatedProject = await response.json();

      setProjects((prev) =>
        prev.map((project) =>
          project._id === editId ? updatedProject : project
        )
      );

      clearForm();
    } catch (error) {
      console.log(error);
      alert("Could not update project. Check backend.");
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );

      if (editId === id) clearForm();
    } catch (error) {
      console.log(error);
      alert("Could not delete project.");
    }
  };

  return (
    <div className="container">
      <h1>Project Management Tool</h1>

      <div className="form-box">
        <h2>{editId ? "Edit Project" : "Add New Project"}</h2>

        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {editId ? (
          <>
            <button onClick={updateProject}>Update Project</button>
            <button onClick={clearForm}>Cancel</button>
          </>
        ) : (
          <button onClick={addProject}>Add Project</button>
        )}
      </div>

      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No projects added yet.</p>
      ) : (
        projects.map((project) => (
          <div className="project-card" key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>

            <button onClick={() => editProject(project)}>Edit</button>
            <button onClick={() => deleteProject(project._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
