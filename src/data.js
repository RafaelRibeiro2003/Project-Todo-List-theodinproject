
import createProject from "./project.js";
import createTodo from "./todo.js";

const savedProjects = localStorage.getItem("projects");

let projects;

if (savedProjects) {
    projects = JSON.parse(savedProjects);
} else {
    projects = [];

    const welcomeProject = createProject("Welcome");
    const workProject = createProject("Work");

    const todo1 = createTodo(
        "Learn JavaScript",
        "Practise factory functions",
        "2026-11-02",
        "medium"
    );

    const todo2 = createTodo(
        "Build Todo List",
        "Display tasks on the page",
        "2026-11-05",
        "high"
    );

    const todo3 = createTodo(
        "Study Webpack",
        "Understand modules and bundling",
        "2026-11-08",
        "low"
    );

    welcomeProject.todos.push(todo1);
    welcomeProject.todos.push(todo2);
    workProject.todos.push(todo3);

    projects.push(welcomeProject, workProject);

    localStorage.setItem("projects", JSON.stringify(projects));
}

export default projects;
