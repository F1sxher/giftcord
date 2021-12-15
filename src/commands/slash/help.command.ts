import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import {
  ArgTypes,
  CommandArgs,
  CommandConfig,
  CommandList,
  ResponseArgs,
} from "../../types.bot";
import Command from "../../resources/classes/command.class";
import BotConfig from "../../config.bot";

const Config: CommandConfig = {
  name: "help",
  description: "Get a list of commands or info on a specific command",
  ucategory: "Utility",
  usage: "help <command>",
  devOnly: false,
  guildOnly: true,
};

const CArgs: CommandArgs = [
  {
    name: "command_name",
    description: "Get detailed information on a specific command",
    required: false,
    type: ArgTypes.STRING,
  },
];

export default abstract class HelpCommand extends Command {
  constructor() {
    super(Config, CArgs);
  }

  async execute(
    client: Client,
    message: CommandInteraction,
    args: ResponseArgs,
    commandlist: CommandList
  ): Promise<void> {
    const clientname: any = client.user?.username;
    const clientav: any = client.user?.avatarURL();

    if (!args.command) {
      const helpEmbed = new MessageEmbed()
        .setTitle("Giftcord Help Menu")
        .setDescription(
          `Giftcord, the bot that keeps on giving!\n**[Invite](https://discord.com/api/oauth2/authorize?client_id=917133047583895552&permissions=412384357441&scope=bot%20applications.commands) | [Support / Community](https://discord.gg/y2aYMVJ5CJ)**`
        )
        .setColor(BotConfig.colors.Main)
        .setAuthor(message.user.tag, message.user.avatarURL()?.toString())
        .setTimestamp()
        .setFooter(clientname, clientav);

      interface embedlist {
        [key: string]: String[];
      }

      let embedcmdlist: embedlist = {};

      Object.keys(commandlist).forEach((c: string) => {
        let cmd = commandlist[c];
        if (!embedcmdlist[cmd.file.config.ucategory])
          embedcmdlist[cmd.file.config.ucategory] = [];
        if (cmd.file.config.rootCategory)
          embedcmdlist[cmd.file.config.ucategory].push(
            `**/${cmd.file.config.rootCategory} ${cmd.name}** → ${cmd.file.config.description}`
          );
        else
          embedcmdlist[cmd.file.config.ucategory].push(
            `**/${cmd.name}** → ${cmd.file.config.description}`
          );
      });

      Object.keys(embedcmdlist).forEach((section) => {
        helpEmbed.addField(section, embedcmdlist[section].join("\n"));
      });

      await message.reply({ embeds: [helpEmbed] });
      return;
    }
  }
}
