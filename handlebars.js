//Retrieve the template data from the HTML .
var root = document.querySelector("#root");
var context = { "name" : "Ritesh Kumar", "occupation" : "developer" };

var template = Handlebars.templates.test;
var templateScript = template(context);
root.innerHTML = templateScript;

// console.log(Handlebars.templates)



//Compile the template data into a function


// var html = templateScript(context);
// console.log(html)
//html = 'My name is Ritesh Kumar . I am a developer.'

// root.append(html);