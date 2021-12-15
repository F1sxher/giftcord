import { Client, CommandInteraction } from "discord.js";
import { CommandConfig, ResponseArgs } from "../../types.bot";
import Command from "../../resources/classes/command.class";

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
    args: ResponseArgs
  ): Promise<void> {
    message.reply(
      `You can invite Giftcord here: **[Click me!](https://discord.com/api/oauth2/authorize?client_id=917133047583895552&permissions=412384357441&scope=bot%20applications.commands)**`
    );
  }
}
