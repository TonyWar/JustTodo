var defaultTemplate = '<li data-id="{{id}}" class="{{completed}}" id="todoItem[{{id}}]">' +
    '<div class="view">' +
    '<input onclick="toggleTodo(id)" class="toggle" type="checkbox" {{checked}} id="checktodo[{{id}}]">' +
    '<label id="textTodo[{{id}}]" ondblclick="changeTodo(id)">{{title}}</label>' +
    '<button class="destroy" id="destroytodo[{{id}}]" onclick="destroyTodo(id)"></button>' +
    '</div>' +
    '</li>';


var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27;',
    '`': '&#x60;'
};

var escapeHtmlChar = function(chr) {
    return htmlEscapes[chr];
};

var reUnescapedHtml = /[&<>"'`]/g;
var reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

var escape = function(string) {
    return (string && reHasUnescapedHtml.test(string)) ?
        string.replace(reUnescapedHtml, escapeHtmlChar) :
        string;
};