function Store(name) {
    this._dbName = name;
    this._idCount = 0;
    if (!localStorage[name]) {
        var data = {
            todos: []
        };
        localStorage[name] = JSON.stringify(data);
    } else {
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id > this._idCount) {
                this._idCount = todos[i].id;
            }
        }
        this._idCount += 1;
    }
}

Store.prototype.saveItem = function(updateData) {
    var data = JSON.parse(localStorage[this._dbName]);
    var todos = data.todos;

    updateData.id = this._idCount;
    this._idCount += 1;
    todos.push(updateData);
    localStorage[this._dbName] = JSON.stringify(data);
};

Store.prototype.updateItem = function(updateData, id) {
    var data = JSON.parse(localStorage[this._dbName]);
    var todos = data.todos;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {

            for (var key in updateData) {
                todos[i][key] = updateData[key];
            }
            break;
        }
    }
    localStorage[this._dbName] = JSON.stringify(data);
}

Store.prototype.removeById = function(id) {
    var data = JSON.parse(localStorage[this._dbName]);
    var todos = data.todos;

    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }
    }

    localStorage[this._dbName] = JSON.stringify(data);
};

Store.prototype.findById = function(id) {
    var todos = JSON.parse(localStorage[this._dbName]).todos;
    return todos.filter(function(todo) {
        if (id == todo.id) {
            return true;
        }
        return false;
    })
}

Store.prototype.findAll = function() {
    return JSON.parse(localStorage[this._dbName]).todos;
};

Store.prototype.find = function(query, callback) {
    if (!callback) {
        return;
    }

    var todos = JSON.parse(localStorage[this._dbName]).todos;

    callback.call(this, todos.filter(function(todo) {
        for (var q in query) {
            if (query[q] !== todo[q]) {
                return false;
            }
        }
        return true;
    }));
};

Store.prototype.createItem = function(title) {
    title = title || '';

    var newItem = {
        title: title.trim(),
        completed: false
    };

    this.saveItem(newItem);
};

Store.prototype.getStats = function() {
    var stats = {
        active: 0,
        completed: 0,
        total: 0
    }
    var todos = this.findAll();
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].completed) {
            stats.completed++;
        } else {
            stats.active++;
        }
        stats.total++;
    }
    return stats;
}

//Избавляемся от мусора
Store.prototype.drop = function() {
    var data = { todos: [] };
    localStorage[this._dbName] = JSON.stringify(data);
};