var createNewTodo = function() {
    //1) Заменить символы, которые при извлечении из store превратятся в кракозябры
    var newTodo = { title: escape(this.value), completed: false };
    //2) сохранить элемент
    MViewControl.toDoStore.saveItem(newTodo);
    //3) показать, что есть в хранилище
    MViewControl.updateView();
    this.value = '';
}

function clearCompletedAction() {
    var data = TodoStore.findAll();
    var deletearr = [];
    data.forEach(function(element) {
        if (element.completed) { deletearr.push(element.id) };
    }, this);
    deletearr.forEach(function(element) {
        TodoStore.removeById(element);
    }, this)
    MViewControl.toggleAll.checked = false;
    MViewControl.updateView();
}

function toggleTodo(id) {
    itemId = Number(id.match(/\d+/));
    todoItem = document.getElementById('todoItem[' + itemId + ']');
    var todoItem = TodoStore.findById(itemId)[0];
    if (todoItem.completed) { todoItem.completed = false; } else { todoItem.completed = true; }
    TodoStore.updateItem(todoItem, itemId);
    MViewControl.updateView();
}

function destroyTodo(id) {
    itemId = Number(id.match(/\d+/));
    console.log('delete id: ' + itemId);
    TodoStore.removeById(itemId);
    MViewControl.updateView();

}

function changeTodo(id) {
    itemId = Number(id.match(/\d+/));
    todoItem = document.getElementById('todoItem[' + itemId + ']');
    var item = TodoStore.findById(itemId)[0];
    var input = document.createElement('input');
    input.className = 'edit';
    input.id = 'todoEdit';
    todoItem.className = todoItem.className + ' editing';
    todoItem.appendChild(input);
    input.focus();
    input.value = item.title;
    input.onkeypress = function(event) {
        var keyPressed = event.keyCode;
        if (keyPressed == 13) {
            var title = this.value;
            //Обновляем значение
            this.blur();
            title = title.trim();
            todoItem.removeChild(input);
            todoItem.className = todoItem.className.replace('editing', '');
            if (title.length !== 0) {
                //update data
                document.getElementById('textTodo[' + itemId + ']').textContent = title;
                TodoStore.updateItem({ title: title }, itemId);

            } else {
                //отменить все действия
            }
        }
    }
}

var toggleAlltodos = function() {
    var todos = TodoStore.findAll();
    if (this.checked) {
        todos.forEach(function(todoEdit) {
            todoEdit.completed = true;
        }, this);
    } else {
        todos.forEach(function(todoEdit) {
            todoEdit.completed = false;
        }, this);
    }
    //Скажем нет оптимизации
    todos.forEach(function(todoEdit) {
        TodoStore.updateItem(todoEdit, todoEdit.id);
    }, this);
    MViewControl.updateView();
}

var dofilter = function() {
    var newfilter = this.id.replace('filter', '').toLowerCase();
    filterAll.className = '';
    filterActive.className = '';
    filterCompleted.className = '';
    this.className = 'selected';
    MViewControl.filter = newfilter;
    MViewControl.updateView();
}