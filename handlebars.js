//Retrieve the template data from the HTML .
var template = document.querySelector("#handlebars-demo").innerHTML;
console.log(template)

var context = { "name" : "Ritesh Kumar", "occupation" : "developer" };

//Compile the template data into a function
var templateScript = Handlebars.compile(template);

var html = templateScript(context);
console.log(html)
//html = 'My name is Ritesh Kumar . I am a developer.'

// $(document.body).append(html);