const createTodo = (
    title,
    description,
    dueDate,
    priority
) => {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false
    };
};

const deleteTodo = (todo, project, projects) => {
    const index = project.todos.indexOf(todo);

    if (index !== -1) {
        project.todos.splice(index, 1);
    }
    localStorage.setItem("projects", JSON.stringify(projects));

};

const editTodo = (todo, newTitle, newDescription, newDueDate, newPriority) => {
    todo.title = newTitle;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    todo.priority = newPriority;
};


const addTodo = (todo, project) => {
    project.todos.push(todo);
};

export {editTodo, deleteTodo, addTodo };
export default createTodo;
