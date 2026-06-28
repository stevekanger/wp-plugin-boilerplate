import fs from 'fs';
import commandLinePrompt from '../utils/commandLinePrompt';
import getRootDir from '../utils/getRootDir';
import {
  authorDescription,
  createInfoDescription,
  initDescription,
  phpNamespaceDescription,
  phpVersionDescription,
  titleDescription,
  wordpressVersionDescription,
} from './promptDescriptions';
import { TemplateVars } from './types';
import updatePhpNamespaces from './updatePhpNamespaces';
import updateTemplateFiles from './updateTemplateFiles';

enum PromptColors {
  black = 30,
  red = 31,
  green = 32,
  yellow = 33,
  blue = 34,
  magenta = 35,
  cyan = 36,
  white = 37,
}

type PromptValidator = (val: string) => void;

/**
 * Logs to the console in a specific color
 *
 * @paramn color The color of text
 * @param txt The text to log
 */
function consoleColor(color: PromptColors, txt: string) {
  console.log(`\x1b[${color}m%s\x1b[0m`, txt);
}

/**
 * Validates that a prompt is not empty
 *
 * @param field The field that you are validating
 */
function validateIsSet(field: string) {
  return (val: string) => {
    if (val === '') {
      throw new Error(`${field} is required. Aborting`);
    }
  };
}

/**
 * Validates the (y/n) promts
 *
 * @param field The field to validate
 */
function validateIsY(field: string) {
  return (val: string) => {
    if (val.toLowerCase().trim() !== 'y') {
      throw new Error(`${field} not confirmed. Aborting`);
    }
  };
}

/**
 * Prompts the user for input
 *
 * @param color The ascii color for the description
 * @param prompt The users prompt
 */
async function prompt(
  prompt: string,
  description: string,
  validator: PromptValidator,
  color: PromptColors = PromptColors.white,
) {
  consoleColor(color, description);
  const answer = await commandLinePrompt(prompt);
  validator(answer);

  return answer;
}

/**
 * Starts the init process
 */
async function main() {
  try {
    await prompt(
      'Continue? (y/n): ',
      initDescription,
      validateIsY('Continue'),
      PromptColors.yellow,
    );

    const title = await prompt(
      'Title: ',
      titleDescription,
      validateIsSet('Title'),
      PromptColors.green,
    );
    const author = await prompt(
      'Author: ',
      authorDescription,
      validateIsSet('Author'),
      PromptColors.green,
    );
    const wordpressVersion = await prompt(
      'Wordrpess Version: ',
      wordpressVersionDescription,
      validateIsSet('Wordpress Version'),
      PromptColors.green,
    );
    const phpVersion = await prompt(
      'Php Version: ',
      phpVersionDescription,
      validateIsSet('Php Version'),
      PromptColors.green,
    );
    const phpNamespace = await prompt(
      'Php Namespace: ',
      phpNamespaceDescription,
      validateIsSet('Php Namespace'),
      PromptColors.green,
    );
    const slug = title.toLowerCase().replaceAll(' ', '-');
    const prefix = title.toLowerCase().replaceAll(' ', '_');
    const authorShort = author.toLowerCase().replaceAll(' ', '');

    const templateVars: TemplateVars = {
      title,
      slug,
      prefix,
      author,
      authorShort,
      wordpressVersion,
      phpVersion,
      phpNamespace,
    };

    await prompt(
      'Is this correct? (y/n): ',
      createInfoDescription(templateVars),
      validateIsY('Info'),
      PromptColors.green,
    );

    updateTemplateFiles(templateVars);
    updatePhpNamespaces(phpNamespace);

    // Remove unneeded files and folders
    try {
      fs.unlinkSync(getRootDir('/wp-plugin-boilerplate.php'));
      fs.rmSync(getRootDir('/.git'), { recursive: true });
    } catch (err) {
      console.log(err);
    }

    consoleColor(PromptColors.green, '\nFinished');
  } catch (err) {
    consoleColor(PromptColors.red, (err as Error).message);
  }
}

main();
