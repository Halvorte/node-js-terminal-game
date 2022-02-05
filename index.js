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
const sleep_1 = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
const sleep_2 = (ms = 1500) => new Promise((r) => setTimeout(r, ms));


// Welcome function to welcome the user to the program
async function Welcome() {
    const rainbowtitle = chalkAnimation.rainbow(
        'Formula 1 quiz'
    );

    await sleep_1();
    rainbowtitle.stop();

    console.log(`
        ${chalk.bgBlue('How to play:')}
        I am a process on your computer.
        If you answer wrong, it will be ${chalk.bgRed('GAME OVER')}.
        Good Luck!
    
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
        message: 'How many times have Lewis Hamilton won the Formula 1 world championship? \n',
        choices: [
            '7',
            '8',
            '9',
        ],
    });
    
    return handleAnswer(answers.question_1 == '7');
}


// Function for question
async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Who won the 2021 Formula 1 world championship? \n',
        choices: [
            'Lewis Hamilton',
            'Max Verstappen',
            'Sebastian Vettel',
        ],
    });
    
    return handleAnswer(answers.question_2 == 'Max Verstappen');
}


// Function for question
async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'What did Gunter Steiner say when Kevin Magnussen slammed his door? \n',
        choices: [
            'He slam my door, I will slam his career',
            'He do not fok smash my door',
            'I should have been a butcher like my father',
        ],
    });
    
    return handleAnswer(answers.question_3 == 'He do not fok smash my door');
}


// Function for question
async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'What was a popular expression when Nico Hulkenberg stepped in for Covid sick drivers? \n',
        choices: [
            'Hulkenback',
            'Hulkenberg',
            'Return of the king',
            'The hulk',
        ],
    });
    
    return handleAnswer(answers.question_4 == 'Hulkenback');
}


// Function for question
async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'What position was George Russel (Mr. Saturday) best qualifying position during the 2021 season? \n',
        choices: [
            '5th place',
            '10th place',
            '3rd place',
            '2nd place',
            '6th place',
            '1st place',
        ],
    });
    
    return handleAnswer(answers.question_5 == '2nd place');
}


// Function to make a spinner "process" a question
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep_2();

    if (isCorrect){
        spinner.success({ text: `Correct ${userName}.` }) ;
    } else {
        spinner.error({ text: `${chalk.bgRed('Game over!')}, you lose ${userName} \n Get good noob` });
        process.exit(1);
    }


}


// Function for winner
function winner() {
    console.clear();
    const msg = `Congratulations, ${userName}! \n You did it \n You win nothing!`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
    
}


// Run the functions
await Welcome();
await getName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();