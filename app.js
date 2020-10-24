const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// Stores employee information
const teampg = []

function originP() {

    // Prompt for CLI
    inquirer
        .prompt([
            {
                type: "List",
                name: "Role",
                message: "What is your Job Title?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "Exit"
                ],
            }
        ])
        .then(answers => {
            // Switch statements
            switch (answers.role) {
                case 'Manager':
                    managerP();
                    break;
                case 'Engineer':
                    engineerP();
                    break;
                case 'Intern':
                    internP();
                    break;
                default:
                    generateHTML();
                    break;
            }
        });
}

// Prompt questions for the Manager class
function managerP() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your office number?"
            }
        ])
        // Creates and pushes answers to the Manager class
        .then(answers => {
            const manager = new Manager(answers.name, id++, answers.email, answers.officeNumber);
            teampg.push(manager);
            originP();
        });
}

// Prompt questions for Engineer class
function engineerP() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your email?"
            },
            {
                type: "input",
                name: "github",
                message: "What is your github username?",
            }
        ])
        // Creates and pushes responses to Engineer class
        .then(answers => {
            const engineer = new Engineer(answers.name, id++, answers.email, answers.github);
            teampg.push(engineer);
            originP();
        });
}

// Prompt questions for Intern class
function internP() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Please enter your name:"
            },
            {
                type: "input",
                name: "email",
                message: "Please enter your email:"
            },
            {
                type: "input",
                name: "school",
                message: "Please enter your current school:",
            }
        ])
        .then(answers => {
            // Creates and pushes responses to Intern class
            const intern = new Intern(answers.name, id++, answers.email, answers.school);
            teampg.push(intern);
            originP();
        });
}

originP();

// Pushes prompt info to html page
function generateHTML() {
    const team = render(teampg);
    fs.writeFile("./output/team.html", team, function (err) {
        if (err) throw err;
    })
}