// import inquirer
const inquirer = require("inquirer");

//  import file system
const fs = require("fs");

// import class constructors from Shapes
const { Triangle, Square, Circle } = require("./lib/shape");

// Create SVG with answers from inquirer prompts
function writeToFile(fileName, answers) {
  // File starts as an empty string
  let svg_string = "";
  // Setting width and height of logo container
  svg_string =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  // <g> tag wraps <text> tag font appears upfront of the shape
  svg_string += "<g>";
  // Takes user input for shape choice and inserts it into SVG file
  svg_string += `${answers.shape}`;

  // Conditional check takes users input from choices array and then adds polygon properties and shape color to SVG string
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svg_string += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svg_string += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svg_string += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
  }

  // <text> tag gives rise to text alignment, text-content/text-color taken in from user prompt and gives default font size of "40"
  svg_string += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  // Closing </g> tag
  svg_string += "</g>";
  // Closing </svg> tag
  svg_string += "</svg>";

  // Using file system module to generate svg file, takes in file name given in the promptUser function, the svg string, and a ternary operator which handles logging any errors, or a "Generated logo.svg" message to the console  
  fs.writeFile(fileName, svg_string, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

// This function utilizes inquirer .prompt to prompt the user to answer questions in the command line and save user input
function UserPrompts() {
  inquirer
    .prompt([
      // Text prompt
      {
        type: "input",
        message:
          "What text would you like you logo to display? (Enter up to three characters)",
        name: "text",
      },
      // Text color prompt
      {
        type: "input",
        message:
          "Choose text color (Enter color keyword OR a hexadecimal number)",
        name: "textColor",
      },
      // Shape choice prompt
      {
        type: "list",
        message: "What shape would you like the logo to render?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      // Shape color prompt
      {
        type: "input",
        message:
          "Choose shapes color (Enter color keyword OR a hexadecimal number)",
        name: "shapeColor",
      },
    ])
    .then((answers) => {
      // Error handling for text prompt (user must enter 3 characters or less for logo to generate)
      if (answers.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        UserPrompts();
      } else {
        // Calling write file function to generate SVG file
        writeToFile("logo.svg", answers);
      }
    });
}

// Calling promptUser function so inquirer prompts fire off when application is ran
UserPrompts();