import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import { CommandConfig, ResponseArgs } from "../../types.bot";
import Command from "../../resources/classes/command.class";
import BotConfig from "../../config.bot";
import uptime from "../../resources/modules/uptime";

const Config: CommandConfig = {
  name: "info",
  description: "Get Bot Information / Statistics",
  ucategory: "Utility",
  usage: "info",
  devOnly: false,
  guildOnly: false,
};
export default abstract class InfoCommand extends Command {
  constructor() {
    super(Config);
  }

  async execute(
    client: Client,
    message: CommandInteraction,
    args: ResponseArgs
  ): Promise<void> {
    const clientname: any = client.user?.username;
    const clientav: any = client.user?.avatarURL();
    let embed = new MessageEmbed()
      .setTitle("Giftcord Bot Information")
      .setDescription(
        `Giftcord, the bot that keeps on giving!\n**[Invite](https://discord.com/api/oauth2/authorize?client_id=917133047583895552&permissions=412384357441&scope=bot%20applications.commands) | [Support](https://discord.gg/y2aYMVJ5CJ)**`
      )
      .setColor(BotConfig.colors.Main)
      .setAuthor(message.user.tag, message.user.avatarURL()?.toString())
      .setTimestamp()
      .setFooter(clientname, clientav)
      .addField(
        "Running Version",
        `**${require("../../../package").version}**`,
        true
      )
      .addField("Uptime", uptime(client), true);

    await message.reply({ embeds: [embed] });
    return;
  }
}
