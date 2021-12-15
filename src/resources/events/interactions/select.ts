import { Client, SelectMenuInteraction } from "discord.js";
import { CommandFile, CommandList, Database } from "../../../types.bot";
import sysLog from "../../modules/sysLog";

export default async (
  client: Client,
  commandlist: CommandList,
  interaction: SelectMenuInteraction,
  db: Database
) => {
  let split = interaction.customId.split("_");
  let commandName;
  let commandSubName;
  let commandGroupName;

  let actionId;

  let command: CommandFile;

  if (split.length >= 4) {
    commandName = split[0];
    commandGroupName = split[1];
    commandSubName = split[2];

    split.shift();
    split.shift();
    actionId = split;
  } else if (split.length === 3) {
    commandName = split[0];
    commandSubName = split[1];

    split.shift();
    actionId = split;
  } else if (split.length == 2) {
    commandName = split[0];

    split.shift();
    actionId = split;
  } else {
    sysLog.warn({
      content:
        "Unable to get command and action data seperate for a button " +
        interaction.id,
      type: 1,
    });
  }

  let fcommand;

  await Object.keys(commandlist).forEach(async (c) => {
    if (commandSubName && commandGroupName) {
      fcommand = commandlist[commandSubName].name === commandSubName;

      if (fcommand) {
        command = commandlist[commandSubName];
      }
    } else if (commandSubName && !commandGroupName) {
      fcommand = commandlist[commandSubName].name === commandSubName;

      if (fcommand) {
        command = commandlist[commandSubName];
      }
    } else {
      fcommand = commandlist[c].name === commandName;

      if (fcommand) {
        command = commandlist[c];
      }
    }

    if (!command) return;
    command.file.select(
      client,
      interaction,
      split[split.length - 1],
      commandlist,
      db
    );
  });
};
