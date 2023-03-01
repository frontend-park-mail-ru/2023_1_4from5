var root = document.querySelector("#arr")
var info = {
    people:[
    {name: "IVan", age: 19},
    {name: "Alik", age: 20},
]};

var template = Handlebars.templates.arr;
var tScript = template(info);
root.innerHTML = tScript;
console.log(root.innerHTML);
