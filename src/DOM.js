import { renderProjects } from "./projectDOM.js";

import {
    renderTasks,
    setupAddTaskButton
} from "./todoDOM.js";

import createProject from "./project.js";
import projects from "./data.js";


let selectedProject = null;


/* Mostrar projetos e gerir a seleção */
const renderProjectList = () => {
    renderProjects(projects, (project) => {
        selectedProject = project;

        if (project) {
            renderTasks(project);
        } else {
            clearTasks();
        }
    });
};


/* Limpar tarefas */
const clearTasks = () => {
    const taskList = document.querySelector(".listTasks");
    const selectedProjectName = document.querySelector("#selectedProjectName");

    taskList.replaceChildren();
    selectedProjectName.textContent = "";
};


/* Configurar botão de adicionar tarefa */
const setupTaskButton = () => {
    setupAddTaskButton(() => selectedProject);
};


/* Formulário para adicionar projeto */
const showAddProjectForm = () => {
    const overlay = document.createElement("div");
    overlay.classList.add("editOverlay");

    const form = document.createElement("form");
    form.classList.add("editForm");

    const heading = document.createElement("h2");
    heading.textContent = "Adicionar projeto";

    const label = document.createElement("label");
    label.textContent = "Nome do projeto";

    const input = document.createElement("input");
    input.type = "text";
    input.name = "projectName";
    input.required = true;

    label.appendChild(input);

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "Guardar";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancelar";

    cancelButton.addEventListener("click", () => {
        overlay.remove();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const projectName = input.value.trim();

        if (projectName === "") {
            return;
        }

        const newProject = createProject(projectName);

        projects.push(newProject);

        localStorage.setItem("projects", JSON.stringify(projects));

        renderProjectList();

        overlay.remove();
    });

    form.append(heading, label, saveButton, cancelButton);
    overlay.appendChild(form);
    document.body.appendChild(overlay);
};


/* Configurar botão de adicionar projeto */
const setupAddProjectButton = () => {
    const addProjectButton = document.querySelector("#addProject");

    addProjectButton.addEventListener("click", () => {
        showAddProjectForm();
    });
};


/* Exportar funções para o index.js */
export {
    renderProjectList,
    setupTaskButton,
    setupAddProjectButton
};