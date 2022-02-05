#!/usr/bin/env node

// your code


import chalk from 'chalk';  // Color text output in terminal
import inquirer from 'inquirer';    // Used to collect user input
import gradient from 'gradient-string';     //
import chalkAnimation from 'chalk-animation';   // Same as chalk but with moving animation color on text in terminal
import figlet from 'figlet';    // Generate ascii out of text
import { createSpinner } from 'nanospinner';    // Used to get a spinner wheel for loading in the terminal

//console.log(chalk.bgGreen('yo man'));

let userName;

// time delay of set time
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));


// Welcome function to welcome the user to the program
async function Welcome() {
    const rainbowtitle = chalkAnimation.rainbow(
        'Who wants to be a millionaire'
    );

    await sleep();
    rainbowtitle.stop();

    console.log(`
        ${chalk.bgBlue('How to play')}
        I am a process on your computer.
        if you get it wrong i will be ${chalk.bgRed('killed')}.
        So get it right!
    
    `)
}


// Function to get the users name
async function getName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    userName = answers.player_name;
}


// Function for question
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Who is the best? \n',
        choices: [
            'Mordi ;)',
            'Fardin :O',
            'Kenneth :)',
        ],
    });
    
    return handleAnswer(answers.question_1 == 'Kenneth :)');
}


// Function to make a spinner "process" a question
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect){
        spinner.success({ text: `Nice work ${userName}.` }) ;
    } else {
        spinner.error({ text: `Game over, you lose ${userName}` });
        process.exit(1);
    }


}


// Function for winner
function winner() {
    console.clear();
    const msg = `Congrats, ${userName}! \n $1,000,000`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}


// Run the functions
await Welcome();
await getName();
await question1();
await winner();