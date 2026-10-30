let selectedProject = null;

const setSelectedProject = (project) => {
    selectedProject = project;
};

const getSelectedProject = () => selectedProject;

export { setSelectedProject, getSelectedProject };