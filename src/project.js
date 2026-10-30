
const createProject = (name) => {
    return {
        name,
        todos: []
    };
};

const deleteProject = (project, projects) => {
    const index = projects.indexOf(project);

    if (index !== -1) {
        projects.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
    }
};

const editProject = (project, newName, projects) => {
    project.name = newName;
    localStorage.setItem("projects", JSON.stringify(projects));

};

export {editProject, deleteProject };
export default createProject;
