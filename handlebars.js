//Retrieve the template data from the HTML .
var root = document.querySelector("#root");
var template = Handlebars.templates.example;
console.log(template)

var context = { "name" : "Ritesh Kumar", "occupation" : "developer" };

//Compile the template data into a function
var templateScript = template(context);

// var html = templateScript(context);
console.log(html)
//html = 'My name is Ritesh Kumar . I am a developer.'
root.innerHTML = templateScript
// root.append(html);