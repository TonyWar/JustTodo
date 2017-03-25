function ViewControl(store) {
    this.toDoStore = store;
    this.template = defaultTemplate;
    this.todoList = document.getElementById('todoList');
    this.todoItemCounter = document.getElementById("todo-count");
    this.clearCompleted = document.getElementById("clearCompleted");
    this.main = document.getElementById("todoMain");
    this.footer = document.getElementById("footer");
    this.toggleAll = document.getElementById("toggleAll");
    this.newTodo = document.getElementById("newTodo");

    this.filterAll = document.getElementById("filterAll");
    this.filterActive = document.getElementById("filterActive");
    this.filterCompleted = document.getElementById("filterCompleted");
    this.filter = 'all';
    this.view = this.updateView();
    console.log('Список Todo загружен');

    newTodo.onchange = createNewTodo;
    clearCompleted.onclick = clearCompletedAction;
    toggleAll.onclick = toggleAlltodos;


    filterAll.onclick = dofilter;
    filterActive.onclick = dofilter;
    filterCompleted.onclick = dofilter;
}



ViewControl.prototype.showItem = function showItem(data) {
    var template = this.template;
    var completed = '';
    var checked = '';
    if (data.completed) {
        completed = 'completed';
        checked = 'checked';
    }
    template = template.replace('{{id}}', data.id);
    template = template.replace('{{id}}', data.id);
    template = template.replace('{{id}}', data.id);
    template = template.replace('{{id}}', data.id);
    template = template.replace('{{id}}', data.id);
    template = template.replace('{{title}}', escape(data.title));
    template = template.replace('{{completed}}', completed);
    template = template.replace('{{checked}}', checked);

    return template;
}

ViewControl.prototype.updateView = function(filter) {
    var i;
    var view = ''
    var data = this.toDoStore.findAll();
    for (i = 0; i < data.length; i++) {
        if ((this.filter == 'all') || (this.filter == 'active' && data[i].completed == false) || (this.filter == 'completed' && data[i].completed == true)) {
            view += this.showItem(data[i]);
        }
    }
    this.todoList.innerHTML = view;
    if (data.length) {
        this.main.style = '';
        this.footer.style = '';
    } else {
        this.main.style = 'display:none;';
        this.footer.style = 'display:none;';
    }
    if (this.toDoStore.getStats().completed > 0) { this.clearCompleted.style = ''; } else { this.clearCompleted.style = 'display:none;'; }

    var stats = this.toDoStore.getStats();
    this.todoItemCounter.innerHTML = '<strong>' + stats.active + '</strong> mission' + (stats.active === 1 ? '' : 's') + ' uncompleted';
    return view;
}