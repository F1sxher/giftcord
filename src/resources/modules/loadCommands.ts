import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import { ArgTypes, CommandList } from "../../types.bot";
import fs from "fs";
import chalk from "chalk";
import sysLog from "./sysLog";
import { config as env } from "dotenv";
env();

const buildCmd = (file) => {
  let data: SlashCommandBuilder | SlashCommandSubcommandBuilder;
  if (file.config.category) {
    data = new SlashCommandSubcommandBuilder();
  } else {
    data = new SlashCommandBuilder();
  }
  data.setName(file.config.name).setDescription(file.config.description);

  if (!file.configarguments) return data;

  file.configarguments.forEach((argument) => {
    switch (argument.type) {
      case ArgTypes.STRING:
        if (argument.choices) {
          data.addStringOption((opt) =>
            opt
              .setName(argument.name)
              .setDescription(argument.description)
              .setRequired(argument.required)
              .addChoices(argument.choices)
          );
        } else {
          data.addStringOption((opt) =>
            opt
              .setName(argument.name)
              .setDescription(argument.description)
              .setRequired(argument.required)
          );
        }
        break;
      case ArgTypes.INTEGER:
        data.addIntegerOption((opt) =>
          opt
            .setName(argument.name)
            .setDescription(argument.description)
            .setRequired(argument.required)
        );
        break;
      case ArgTypes.BOOLEAN:
        data.addBooleanOption((opt) =>
          opt
            .setName(argument.name)
            .setDescription(argument.description)
            .setRequired(argument.required)
        );
        break;
      case ArgTypes.USER:
        data.addUserOption((opt) =>
          opt
            .setName(argument.name)
            .setDescription(argument.description)
            .setRequired(argument.required)
        );
        break;
      case ArgTypes.CHANNEL:
        data.addChannelOption((opt) =>
          opt
            .setName(argument.name)
            .setDescription(argument.description)
            .setRequired(argument.required)
        );
        break;
      case ArgTypes.ROLE:
        data.addRoleOption((opt) =>
          opt
            .setName(argument.name)
            .setDescription(argument.description)
            .setRequired(argument.required)
        );
        break;
      case ArgTypes.MENTIONABLE:
        data.addMentionableOption((opt) =>
          opt
            .setName(argument.name)
            .setDescription(argument.description)
            .setRequired(argument.required)
        );
        break;
      case ArgTypes.NUMBER:
        data.addNumberOption((opt) =>
          opt
            .setName(argument.name)
            .setDescription(argument.description)
            .setRequired(argument.required)
        );
        break;
    }
  });

  return data;
};

export default () => {
  let commandlist: CommandList = {};
  let ctxmenulist: CommandList = {};

  fs.readdir("./src/commands/slash/", (err, cats: string[]) => {
    if (err) {
      return sysLog.error({
        content: `${chalk.red.bold(
          "An error occured when checking a command folder for commands to load: "
        )} ${err}`,
        type: 2,
      });
    }
    cats.forEach((cat: string) => {
      if (cat.endsWith(".command.ts")) {
        let commandFile = require(`../../commands/slash/${cat}`);
        let cmdFile;
        try {
          cmdFile = new commandFile.default();
        } catch (err) {
          return sysLog.warn({
            content: `${chalk.red.bold(
              `An error occured when attempting to load command ${cat}`
            )} ${err}`,
            type: 2,
          });
        }
        if (!cmdFile) return;
        let builtCmd = buildCmd(cmdFile);
        commandlist[`${cat.split(".")[0]}`] = {
          file: cmdFile,
          build: builtCmd,
          name: cat.split(".")[0],
        };
        return;
      } else if (cat.endsWith(".disabled.ts")) {
        return sysLog.info({
          content: `${chalk.magenta.bold(
            `Command ${cat.split(".")[0]} is disabled and will not be loaded`
          )}`,
          type: 2,
        });
      }
      fs.readdir(`./src/commands/slash/${cat}/`, (err, subcats: string[]) => {
        if (err) {
          return sysLog.error({
            content: `${chalk.red.bold(
              "An error occured when checking a command folder for commands to load: "
            )} ${err}`,
            type: 2,
          });
        }
        subcats.forEach((subcat: string) => {
          if (subcat.endsWith(".command.ts")) {
            let commandFile = require(`../../commands/slash/${cat}/${subcat}`);
            let cmdFile = new commandFile.default();
            let builtCmd = buildCmd(cmdFile);
            commandlist[`${subcat.split(".")[0]}`] = {
              file: cmdFile,
              build: builtCmd,
              name: subcat.split(".")[0],
              subCategory: cat.split(".")[0],
            };
            return;
          } else if (subcat.endsWith(".disabled.ts")) {
            return sysLog.info({
              content: `${chalk.magenta.bold(
                `Command ${
                  subcat.split(".")[0]
                } is disabled and will not be loaded`
              )}`,
              type: 2,
            });
          }
          fs.readdir(
            `./src/commands/slash/${cat}/${subcat}`,
            (err, subcmds: string[]) => {
              if (err) {
                return sysLog.error({
                  content: `${chalk.red.bold(
                    "An error occured when checking a command folder for commands to load: "
                  )} ${err}`,
                  type: 2,
                });
              }
              subcmds.forEach((subcmd) => {
                if (subcmd.endsWith(".command.ts")) {
                  let commandFile = require(`../../commands/slash/${cat}/${subcat}/${subcmd}`);
                  let cmdFile = new commandFile.default();
                  let builtCmd = buildCmd(cmdFile);
                  commandlist[`${subcmd.split(".")[0]}`] = {
                    file: cmdFile,
                    build: builtCmd,
                    name: subcmd.split(".")[0],
                    parentCategory: cat.split(".")[0],
                    subCategory: subcat.split(".")[0],
                  };
                  return;
                }
              });
            }
          );
        });
      });
    });
  });

  fs.readdir("./src/commands/context/user", (err, cmds: string[]) => {
    if (err) {
      return sysLog.error({
        content: `${chalk.red.bold(
          "An error occured when checking a command folder for commands to load: "
        )} ${err}`,
        type: 2,
      });
    }
    cmds.forEach((cmd: string) => {
      if (cmd.endsWith(".user.ts")) {
        let commandFile = require(`../../commands/context/user/${cmd}`);
        let cmdFile;
        try {
          cmdFile = new commandFile.default();
        } catch (err) {
          return sysLog.warn({
            content: `${chalk.red.bold(
              `An error occured when attempting to load command ${cmd}`
            )} ${err}`,
            type: 2,
          });
        }
        let builtCmd = {
          name: cmdFile.config.name,
          type: 2,
        };
        if (!cmdFile) return;
        ctxmenulist[`${cmd.split(".")[0]}`] = {
          file: cmdFile,
          ctxBuild: builtCmd,
          cxtMenu: "USER",
          name: cmd.split(".")[0],
        };
        return;
      }
    });
  });
  return { commandlist, ctxmenulist };
};
