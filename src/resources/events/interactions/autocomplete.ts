import { AutocompleteInteraction, Client } from "discord.js";
import { CommandList, Database } from "../../../types.bot";

export default async (
  client: Client,
  commandlist: CommandList,
  interaction: AutocompleteInteraction,
  db: Database
) => {
  switch (interaction.commandName) {
    case "gift":
      let findUser = await db.users.findOne({ userId: interaction.user.id });

      if (!findUser) {
        interaction.respond([
          {
            name: "You do not have a profile. Please setup a profile",
            value: "noprofile",
          },
        ]);
      }
      break;

    default:
      break;
  }
};
