var dbName = 'TodoList'
var TodoStore = new Store(dbName);
var MViewControl = new ViewControl(TodoStore);
console.log('Инициилизация ViewControl прошла успешно');