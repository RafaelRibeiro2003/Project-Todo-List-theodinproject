
import "./styles.css";

import {
    renderProjectList,
    setupTaskButton
} from "./DOM.js";

import { setupAddProjectButton } from "./DOM.js";

import projects from "./data.js";

// Mostrar projetos
renderProjectList();

// Configurar botões
setupTaskButton();
setupAddProjectButton();

// Selecionar o projeto Welcome inicialmente
const welcomeProject = projects.find(
    (project) => project.name === "Welcome"
);

if (welcomeProject) {
    const welcomeProjectElement = [...document.querySelectorAll(".projectContent")]
        .find((element) =>
            element.querySelector(".projectName").textContent === "Welcome"
        );

    if (welcomeProjectElement) {
        welcomeProjectElement.click();
    }
}
