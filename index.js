#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// Welcome message
async function welcome() {
  console.log(
    gradient.rainbow(
      figlet.textSync("Welcome to my CLI", { horizontalLayout: "full" }),
    ),
  );
  console.log(chalk.bgGreenBright("Let's play a quizz game!"));
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a millionaire? \n",
  );

  // after 3 seconds, stop the animation
  await sleep(3000);
  rainbowTitle.stop();

  console.log(`${chalk.green("How To Play")}
    I am going to ask you a series of questions and you will answer them.
    If you answer all questions correctly, you will win 1 million dollars.
    If you answer any question incorrectly, you will lose the game.
    Are you ready to play?`);
}

// Ask for player's name
async function askName() {
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
  ]);
  playerName = response.name;
  console.log(`Welcome ${playerName}!`);
}

// handleAnswer function: check if the answer is correct
async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep(2000);

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1); // Exit the process
  }
}

// Ask a question
// Abstracted function to ask a question
async function askQuestion(questionDetails) {
  const answers = await inquirer.prompt({
    name: "question",
    type: "list",
    message: questionDetails.message,
    choices: questionDetails.choices,
  });
  return handleAnswer(answers.question === questionDetails.correctAnswer);
}

async function question1() {
  return askQuestion({
    message: "JavaScript was created in 10 days then released on\n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17, 1996",
    ],
    correctAnswer: "Dec 4th, 1995",
  });
}

async function question2() {
  return askQuestion({
    message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
    choices: ["4", '"4"', '"1111"', "69420"],
    correctAnswer: '"1111"',
  });
}

async function question3() {
  return askQuestion({
    message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
    choices: ["0", "🐏", "🐍", "undefined"],
    correctAnswer: "undefined",
  });
}

async function question4() {
  return askQuestion({
    message: "Which of the following is NOT a primitive type?\n",
    choices: ["boolean", "number", "null", "object"],
    correctAnswer: "object",
  });
}

async function question5() {
  return askQuestion({
    message:
      "JS is a high-level single-threaded, garbage-collected,\n" +
      "interpreted (or just-in-time compiled), prototype-based,\n" +
      "multi-paradigm, dynamic language with a ____ event loop\n",
    choices: ["multi-threaded", "non-blocking", "synchronous", "promise-based"],
    correctAnswer: "non-blocking",
  });
}

// winning message
function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(
      chalk.green(
        `Programming isn't about what you know; it's about making the command line look cool`,
      ),
    );
    process.exit(0);
  });
}

// Run it with top-level await
// Player's name
let playerName;

// sleep function: Promise based setTimeout
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Main function
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
