
import editIcon from "./images/edit_transparent.png";
import trashIcon from "./images/trash_transparent.png";

import { editProject, deleteProject } from "./project.js";
import projects from "./data.js";


const renderProjects = (projects, onSelectProject) => {
    const listProjects = document.querySelector(".listProjects");

    listProjects.replaceChildren();

    projects.forEach((project) => {
        const projectContent = document.createElement("div");
        projectContent.classList.add("projectContent");

        const projectName = document.createElement("span");
        projectName.textContent = project.name;
        projectName.classList.add("projectName");

        const projectActions = document.createElement("div");
        projectActions.classList.add("projectActions");

        // Botão de editar
        const editButton = createEditButton("editProject", () => {
            showEditProjectForm(project, onSelectProject);
        });

        // Botão de apagar
        const deleteButton = createDeleteButton("deleteProject", () => {
            deleteProject(project, projects);
            renderProjects(projects, onSelectProject);
        });

        projectActions.append(editButton, deleteButton);
        projectContent.append(projectName, projectActions);
        listProjects.appendChild(projectContent);

        // Selecionar projeto
        projectContent.addEventListener("click", () => {
            document.querySelectorAll(".projectContent").forEach((element) => {
                element.classList.remove("selected");
            });

            projectContent.classList.add("selected");

            const selectedProjectName = document.querySelector(
                "#selectedProjectName"
            );

            selectedProjectName.textContent = project.name;

            onSelectProject(project);
        });
    });
};


/* Botão de editar */
const createEditButton = (className, onEdit) => {
    const editButton = document.createElement("button");
    editButton.classList.add(className);
    editButton.type = "button";

    const editImg = document.createElement("img");
    editImg.src = editIcon;
    editImg.alt = "";
    editImg.height = 20;

    editButton.append(editImg, " Edit");

    editButton.addEventListener("click", (event) => {
        event.stopPropagation();
        onEdit();
    });

    return editButton;
};


/* Botão de apagar */
const createDeleteButton = (className, onDelete) => {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(className);
    deleteButton.type = "button";

    const deleteImg = document.createElement("img");
    deleteImg.src = trashIcon;
    deleteImg.alt = "";
    deleteImg.height = 20;

    deleteButton.append(deleteImg, " Del");

    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        onDelete();
    });

    return deleteButton;
};


/* Formulário de editar projeto */
const showEditProjectForm = (project, onSelectProject) => {
    const overlay = document.createElement("div");
    overlay.classList.add("editOverlay");

    const form = document.createElement("form");
    form.classList.add("editForm");

    const heading = document.createElement("h2");
    heading.textContent = "Editar projeto";

    const label = document.createElement("label");
    label.textContent = "Nome do projeto";

    const input = document.createElement("input");
    input.type = "text";
    input.name = "projectName";
    input.value = project.name;
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

        const newName = input.value.trim();

        if (newName === "") {
            return;
        }

        editProject(project, newName, projects);

        renderProjects(projects, onSelectProject);

        overlay.remove();
    });

    form.append(heading, label, saveButton, cancelButton);
    overlay.appendChild(form);
    document.body.appendChild(overlay);
};


export { renderProjects };
