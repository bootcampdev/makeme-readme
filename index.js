//
// generate a readme file using a template.  can add
// additional templates later for specifc language environments

const fs = require("fs");
const inquirer = require("inquirer");
const Mustache = require('mustache');
//
// constant variables

const mustache_template = './utils/main.mustache';
//
// user prompts

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your title of the project?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Enter a short description:',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Describe any pre-installation instructions:',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'How to use or launch this application?',
            name: 'usage',
        },
        {
            type: 'list',
            message: 'Is there a test enviroment?',
            name: "test",
            choices: ["Yes", "No"],
            default: "No"
        },
        {
            type: 'input',
            name: 'testdesc',
            message: 'Describe the test enviroment:',
            when: (data) => data.test === 'Yes'
        },
        {
            type: 'input',
            message: 'Your GitHub account username?',
            name: 'username',
            default: "bootcampdev"
        },
        {
            type: 'input',
            message: 'Your email address?',
            name: 'email'
        },
        {
            type: 'checkbox',
            message: 'License?',
            name: "license",
            choices: ["MIT", "Mozilla"]
        }
    ])
    .then(data => {
    
        data.update_date = Date().toString();        

        //console.log(data);
        //console.log (mustache_template);
       
        fs.readFile(mustache_template, (err, template) =>  {
            if (err) throw err;
            const output = Mustache.render(template.toString(), data);
            fs.writeFileSync('readme.md', output, function (err)
            {
                if (err) return console.log(err);               
            });
            console.log("readme successfully created!");
        });      

    })    


