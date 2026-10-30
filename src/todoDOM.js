
import editIcon from "./images/edit_transparent.png";
import trashIcon from "./images/trash_transparent.png";

import { editTodo, deleteTodo, addTodo } from "./todo.js";
import createTodo from "./todo.js";
import projects from "./data.js";


const renderTasks = (project) => {
    const listTasks = document.querySelector(".listTasks");

    listTasks.replaceChildren();

    project.todos.forEach((todo) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("taskContent");

        const taskTitle = document.createElement("h3");
        taskTitle.textContent = todo.title;

        const taskDescription = document.createElement("p");
        taskDescription.textContent = todo.description;

        const taskDueDate = document.createElement("p");
        taskDueDate.textContent = `Due date: ${todo.dueDate}`;

        const taskTexts = document.createElement("div");

        taskTexts.append(
            taskTitle,
            taskDescription,
            taskDueDate
        );

        const taskPriority = document.createElement("p");
        taskPriority.textContent = `Priority: ${todo.priority}`;
        taskPriority.classList.add("taskPriority");
        taskPriority.classList.add(`priority-${todo.priority}`);

        const taskActions = document.createElement("div");
        taskActions.classList.add("taskActions");

        // Botão de editar
        const editButton = createEditButton("editTask", () => {
            showEditTaskForm(todo, project);
        });

        // Botão de apagar
        const deleteButton = createDeleteButton("deleteTask", () => {
            deleteTodo(todo, project);
            localStorage.setItem("projects", JSON.stringify(projects));
            renderTasks(project);
        });

        taskActions.append(editButton, deleteButton);

        taskElement.append(taskTexts, taskPriority, taskActions);
        listTasks.appendChild(taskElement);
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



const showEditTaskForm = (todo, project) => {
    const overlay = document.createElement("div");
    overlay.classList.add("editOverlay");

    const form = document.createElement("form");
    form.classList.add("editForm");

    const heading = document.createElement("h2");
    heading.textContent = "Editar tarefa";

    // Título
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Título";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.value = todo.title;
    titleInput.required = true;

    titleLabel.appendChild(titleInput);

    // Descrição
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Descrição";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.name = "description";
    descriptionInput.value = todo.description;

    descriptionLabel.appendChild(descriptionInput);

    // Data limite
    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Data limite";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "dueDate";
    dateInput.value = todo.dueDate;
    dateInput.required = true;

    dateLabel.appendChild(dateInput);

    // Prioridade
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Prioridade";

    const prioritySelect = document.createElement("select");
    prioritySelect.name = "priority";

    const priorities = ["low", "medium", "high"];

    priorities.forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent =
            priority.charAt(0).toUpperCase() + priority.slice(1);

        if (priority === todo.priority) {
            option.selected = true;
        }

        prioritySelect.appendChild(option);
    });

    priorityLabel.appendChild(prioritySelect);

    // Botões
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "Guardar";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancelar";

    cancelButton.addEventListener("click", () => {
        overlay.remove();
    });

    // Guardar alterações
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTitle = titleInput.value.trim();
        const newDescription = descriptionInput.value.trim();
        const newDueDate = dateInput.value;
        const newPriority = prioritySelect.value;

        if (newTitle === "" || newDueDate === "") {
            return;
        }

        editTodo(
            todo,
            newTitle,
            newDescription,
            newDueDate,
            newPriority
        );

        localStorage.setItem("projects", JSON.stringify(projects));

        renderTasks(project);
        overlay.remove();
    });

    form.append(
        heading,
        titleLabel,
        descriptionLabel,
        dateLabel,
        priorityLabel,
        saveButton,
        cancelButton
    );

    overlay.appendChild(form);
    document.body.appendChild(overlay);
};




const showAddTaskForm = (project) => {
    const overlay = document.createElement("div");
    overlay.classList.add("editOverlay");

    const form = document.createElement("form");
    form.classList.add("editForm");

    const heading = document.createElement("h2");
    heading.textContent = "Adicionar tarefa";

    // Título
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Título";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.required = true;

    titleLabel.appendChild(titleInput);

    // Descrição
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Descrição";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.name = "description";

    descriptionLabel.appendChild(descriptionInput);

    // Data limite
    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Data limite";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "dueDate";
    dateInput.required = true;

    dateLabel.appendChild(dateInput);

    // Prioridade
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Prioridade";

    const prioritySelect = document.createElement("select");
    prioritySelect.name = "priority";

    ["low", "medium", "high"].forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent =
            priority.charAt(0).toUpperCase() + priority.slice(1);

        if (priority === "medium") {
            option.selected = true;
        }

        prioritySelect.appendChild(option);
    });

    priorityLabel.appendChild(prioritySelect);

    // Botões
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "Adicionar";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancelar";

    cancelButton.addEventListener("click", () => {
        overlay.remove();
    });

    // Adicionar tarefa
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const dueDate = dateInput.value;
        const priority = prioritySelect.value;

        if (title === "" || dueDate === "") {
            return;
        }

        const newTodo = createTodo(
            title,
            description,
            dueDate,
            priority
        );

        addTodo(newTodo, project);

        localStorage.setItem("projects", JSON.stringify(projects));

        renderTasks(project);
        overlay.remove();
    });

    form.append(
        heading,
        titleLabel,
        descriptionLabel,
        dateLabel,
        priorityLabel,
        saveButton,
        cancelButton
    );

    overlay.appendChild(form);
    document.body.appendChild(overlay);
};




const setupAddTaskButton = (getSelectedProject) => {
    const addTaskButton = document.querySelector("#addTask");

    addTaskButton.addEventListener("click", () => {
        const selectedProject = getSelectedProject();

        if (!selectedProject) {
            alert("Seleciona primeiro um projeto.");
            return;
        }

        showAddTaskForm(selectedProject);
    });
};


export {
    renderTasks,
    setupAddTaskButton
};
