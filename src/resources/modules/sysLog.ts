import chalk from "chalk";
import config from "../../config.bot";

export default {
  /**
   * Sends a GREEN Info log message to the console.
   * @param content String Content
   * @param type Number Type
   * - Type 1 | Bot
   * - Type 2 | Command
   * - Type 3 | Database
   * - Type 4 | Event
   */
  success: (options: { content: string; type: number }) => {
    let typeDisplay: string;
    if (!options.content) return;
    switch (options.type) {
      case 1:
        typeDisplay = `BOT | ${options.content}`;
        break;
      case 2:
        typeDisplay = `COMMAND | ${options.content}`;
        break;
      case 3:
        typeDisplay = `DATABASE | ${options.content}`;
        break;
      case 4:
        typeDisplay = `EVENT | ${options.content}`;
        break;
      default:
        typeDisplay = options.content;
        break;
    }
    console.log(
      `${chalk.green.bold("INFO")} | ${
        options.type ? typeDisplay : options.content
      }`
    );
  },

  /**
   * Sends an Info log message to the console.
   * @param content String Content
   * @param type Number Type
   * - Type 1 | Bot
   * - Type 2 | Command
   * - Type 3 | Database
   * - Type 4 | Event
   */
  info: (options: { content: string; type: number }) => {
    let typeDisplay: string;
    if (!options.content) return;
    switch (options.type) {
      case 1:
        typeDisplay = `BOT | ${options.content}`;
        break;
      case 2:
        typeDisplay = `COMMAND | ${options.content}`;
        break;
      case 3:
        typeDisplay = `DATABASE | ${options.content}`;
        break;
      case 4:
        typeDisplay = `EVENT | ${options.content}`;
        break;
      default:
        typeDisplay = options.content;
        break;
    }
    console.log(
      `${chalk.blue.bold("INFO")} | ${
        options.type ? typeDisplay : options.content
      }`
    );
  },
  /**
   * Sends an Warn log message to the console.
   * @param content String Content
   * @param type Number Type
   * - Type 1 | Bot
   * - Type 2 | Command
   * - Type 3 | Database
   * - Type 4 | Event
   */
  warn: (options: { content: string; type: number }) => {
    let typeDisplay: string;
    if (!options.content) return;
    switch (options.type) {
      case 1:
        typeDisplay = `BOT | ${options.content}`;
        break;
      case 2:
        typeDisplay = `COMMAND | ${options.content}`;
        break;
      case 3:
        typeDisplay = `DATABASE | ${options.content}`;
        break;
      case 4:
        typeDisplay = `EVENT | ${options.content}`;
        break;
      default:
        typeDisplay = options.content;
        break;
    }
    console.warn(
      `${chalk.yellow.bold("WARNING")} | ${
        options.type ? typeDisplay : options.content
      }`
    );
  },
  /**
   * Sends an Error log message to the console.
   * @param content String Content
   * @param type Number Type
   * - Type 1 | Bot
   * - Type 2 | Command
   * - Type 3 | Database
   * - Type 4 | Event
   */
  error: (options: { content: string; type: number }) => {
    let typeDisplay: string;
    if (!options.content) return;
    switch (options.type) {
      case 1:
        typeDisplay = `BOT | ${options.content}`;
        break;
      case 2:
        typeDisplay = `COMMAND | ${options.content}`;
        break;
      case 3:
        typeDisplay = `DATABASE | ${options.content}`;
        break;
      case 4:
        typeDisplay = `EVENT | ${options.content}`;
        break;
      default:
        typeDisplay = options.content;
        break;
    }
    console.warn(
      `${chalk.red.bold("ERROR")} | ${
        options.type ? typeDisplay : options.content
      }`
    );
  },
};

// OLD CODE
/*info: (options: { content: string; type: number }) => {
    if (!options.content) return;
    console.log(
      "%cINFO",
      `%c| ${
        options.type
          ? () => {
              switch (options.type) {
                case 1:
                  return `BOT | ${options.content}`;
                case 2:
                  return `COMMAND | ${options.content}`;
                case 3:
                  return `DATABASE | ${options.content}`;
                case 4:
                  return `EVENT | ${options.content}`;
                default:
                  return options.content;
              }
            }
          : options.content
      }`,
      `color: #${config.colors.Blue}`,
      'color: #000000'
    );
    return;*/
