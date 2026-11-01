{projects.length === 0 ? (
  <p>No projects added yet.</p>
) : (
  projects.map((project) => (
    <div className="project-card" key={project._id}>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>

      <button onClick={() => editProject(project)}>
        Edit
      </button>

      <button onClick={() => deleteProject(project._id)}>
        Delete
      </button>
    </div>
  ))
)}
