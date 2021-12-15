import { Client, CommandInteraction } from "discord.js";
import {
  CommandList,
  Database,
  ResponseArgs,
  FormattedPerms,
} from "../../../types.bot";
import Command from "../../classes/command.class";
import BotConfig from "../../../config.bot";
import checkPermissions from "../../../resources/modules/checkPermissions";

export default async (
  client: Client,
  commandlist: CommandList,
  interaction: CommandInteraction,
  db: Database
) => {
  if (interaction.user.bot || interaction.channel?.type === "DM") return;
  let args: ResponseArgs = {};
  const commandName = interaction.commandName;
  let commandGroupName: string | boolean;
  let commandSubName: string | boolean;

  // let guildFound = await db.users.findOne({ guildId: interaction.guildId });
  // if (!guildFound) {
  //   await db.guilds.create({
  //     guildId: interaction.guildId,
  //     prefix: "",
  //     welcomeChannel: "",
  //     logsChannel: "",
  //     modRoles: [],
  //     joinRoles: [],
  //   });
  // }

  try {
    commandGroupName = interaction.options.getSubcommandGroup();
  } catch (error) {
    commandGroupName = false;
  }
  try {
    commandSubName = interaction.options.getSubcommand();
  } catch (error) {
    commandSubName = false;
  }
  let fcommand;

  if (!commandGroupName && !commandSubName)
    interaction.options.data.forEach((opt) => {
      args[opt.name] = {
        name: opt.name,
        type: opt.type,
        value: opt.value,
        channel: opt.channel,
        role: opt.role,
        user: opt.user,
        member: opt.member,
      };
    });
  else if (!commandGroupName && commandSubName)
    interaction.options.data[0].options?.forEach((opt) => {
      args[opt.name] = {
        name: opt.name,
        type: opt.type,
        value: opt.value,
        channel: opt.channel,
        role: opt.role,
        user: opt.user,
        member: opt.member,
      };
    });
  else if (commandGroupName && commandSubName)
    interaction.options.data[0].options![0].options?.forEach((opt) => {
      args[opt.name] = {
        name: opt.name,
        type: opt.type,
        value: opt.value,
        channel: opt.channel,
        role: opt.role,
        user: opt.user,
        member: opt.member,
      };
    });

  let command: Command;
  let ran = false;
  let running = false;

  await Object.keys(commandlist).forEach(async (c) => {
    if (ran === true || running === true) return;
    if (commandSubName && commandGroupName) {
      fcommand =
        commandlist[interaction.options.getSubcommand()].name ===
        commandSubName;

      if (fcommand) {
        command = commandlist[interaction.options.getSubcommand()].file;
      }
    } else if (commandSubName && !commandGroupName) {
      fcommand =
        commandlist[interaction.options.getSubcommand()].name ===
        commandSubName;

      if (fcommand) {
        command = commandlist[interaction.options.getSubcommand()].file;
      }
    } else {
      fcommand = commandlist[c].name === commandName;

      if (fcommand) {
        command = commandlist[c].file;
      }
    }

    if (command) {
      running = true;
      let clientHasPerms: boolean = false;
      let userHasPerms: boolean = false;

      clientHasPerms = await checkPermissions.checkClientPerms(
        client,
        interaction,
        command.config.clientPermissions
      );
      userHasPerms = await checkPermissions.checkUserPerms(
        interaction,
        command.config.userPermissions,
        db
      );

      if (clientHasPerms === false) {
        running = false;

        let missingPermsL: string[] = [];

        command.config.clientPermissions?.forEach((perm) => {
          missingPermsL.push(FormattedPerms[perm.toString()]);
        });

        let missingPerms: string = missingPermsL.join(", ");
        return interaction.reply({
          embeds: [
            BotConfig.embedTemplates
              .err(`I don't have the correct permissions to run this command! `)
              .addField(
                `Make sure I have these permissions enabled:`,
                `\`${missingPerms}\``
              ),
          ],
          ephemeral: true,
        });
      }

      if (userHasPerms === false) {
        running = false;
        return interaction.reply({
          embeds: [
            BotConfig.embedTemplates.err(
              "You don't have permission to use this command."
            ),
          ],
          ephemeral: true,
        });
      }

      command.execute(client, interaction, args, commandlist, db);

      running = false;
      return (ran = true);
    }
    running = false;
  });

  if (!ran && !running)
    interaction.reply({
      embeds: [
        BotConfig.embedTemplates.err(
          "The command you were trying to run does not have a file for it, or an unknown error occured. Please try again, if problem persists, **[join our support server](https://discord.gg/y2aYMVJ5CJ)**"
        ),
      ],
      ephemeral: true,
    });
};
