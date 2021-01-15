const { timeStamp } = require("console");
const fs = require("fs");
const inquirer = require("inquirer");
const Mustache = require('mustache');

const generateMarkdown = require("./utils/generateMarkdown");

const mustache_template_js = './utils/main.mustache';
const mustache_template_csharp = './utils/csharp.mustache';

//axios

//console.log(process.argv);

// fs.writeFile('log.txt', process.argv[2], (err) =>
//   err ? console.error(err) : console.log('Success!')
// );

// appendFile() takes in 3 arguments: path, data, and callback function
// fs.appendFile('log.txt', `${process.argv[2]}\n`, (err) =>
//   // Ternary operator takes in a condition followed by a question mark (?)
//   // then an expression to execute if the condition is truthy followed by a colon (:)
//   // and finally the expression to execute if the condition is falsy.
//   // This operator is frequently used as a shortcut for the if statement.
//   err ? console.error(err) : console.log('Commit logged!')
// );

inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: 'list',
            message: 'Which Readme template wwould you like to use?',
            name: 'template_base',
            choices: ["JavaScript", "C#"]
        },
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
            message: 'Test enviroment?',
            name: "test",
            choices: ["Yes", "No"]
        },
        {
            type: 'checkbox',
            message: 'License?',
            name: "license",
            choices: ["MIT", "Mozilla"]
        }
        // {
        //     type: 'input',
        //     message: 'Enter a usage command:',
        //     name: 'usage',
        // },
        // {
        //     type: 'checkbox',
        //     message: 'What language to you know?',
        //     name: 'language',
        //     choices: ["c#", "javascript"],
        // },
        // {
        //     type: 'list',
        //     message: 'What method of communication?',
        //     name: 'communication',
        //     choices: ["english", "cherbish"]
        // }
    ])
    .then(data => {
        // Use user feedback for... whatever!!
        //const html= generateMarkdown(data)

        // fs.writeFile("readme.md", JSON.stringify(data), (err)=>{
        //     err ? (console.log("failed")) : console.log("success");                    
        // })

        //fs.writeFile("`${slugify(data.name,{replacement: '-',lower: false,})}.html`", html, err => { if(err) throw err;} )

        // fs.writeFile("readme.md", html, (err)=>{
        //     err ? (console.log("failed")) : console.log("success");                    
        // })
    
        data.update_date = Date().toString();

        let mustache_template;
        if (data.template_base === "JavaScript")
            mustache_template = mustache_template_js;
        else
            mustache_template = mustache_template_csharp;            

        console.log(data);
        console.log (mustache_template);
       
        fs.readFile(mustache_template, (err, template) =>  {
            if (err) throw err;
            const output = Mustache.render(template.toString(), data);
            fs.writeFileSync('readme.md', output);
        });      

    })
    // .catch(error => {
    //     if (error.isTtyError) {
    //         // Prompt couldn't be rendered in the current environment
    //     } else {
    //         // Something else when wrong
    //     }
    // });

    

    //generateReadMe();      


