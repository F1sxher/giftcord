import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import { CommandConfig, ResponseArgs, Database, CommandList } from "../../types.bot";
import Command from "../../resources/classes/command.class";
import BotConfig from "../../config.bot";

const Config: CommandConfig = {
  name: "invite",
  description: "Get the link to invite Giftcord.",
  usage: "invite",
  ucategory: "Utility",
  devOnly: false,
  guildOnly: false,
};
export default abstract class InviteCommand extends Command {
  constructor() {
    super(Config);
  }

  async execute(
    client: Client,
    message: CommandInteraction,
    args: ResponseArgs,
    commandlist: CommandList,
    db: Database
  ): Promise<void> {
    let dbUser = await db.users.findOne({ userId: message.user.id });
    if (!dbUser) {
      const noProfile = new MessageEmbed()
        .setAuthor(message.user.tag, message.user?.avatarURL()?.toString())
        .setColor(BotConfig.colors.Red)
        .setDescription("Oh no! It seems as if you don't have a profile. Run the /profile command to make one!");
      message.reply({embeds: [noProfile], ephemeral: true});
    } else {
    let embed = new MessageEmbed()
      //.setTitle(`${message.user.username}'s Level`)
      .setAuthor(`${message.user.username}'s`, message.user.displayAvatarURL())
      .addField(`  Level  `, `${dbUser?.currentLevel}`, true)
      .addField(`  XP  `, `${dbUser?.currentXp}/${dbUser?.xpRequired}`, true)
      //.addField(`  Total XP  `, `${dbUser?.currentXp}`, true)
      .setColor(BotConfig.colors.Main)
    message.reply({embeds: [embed], ephemeral: true});
    }
  }
}
