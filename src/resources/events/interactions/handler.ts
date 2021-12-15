import { Client, Interaction } from "discord.js";
import { CommandList, Database } from "../../../types.bot";
import sysLog from "../../modules/sysLog";
import command from "./command";
import button from "./button";
import autocomplete from "./autocomplete";
import select from "./select";

export default (
  client: Client,
  commandlist: CommandList,
  interaction: Interaction,
  db: Database
) => {
  if (interaction.isCommand()) {
    command(client, commandlist, interaction, db);
  } else if (interaction.isAutocomplete()) {
    autocomplete(client, commandlist, interaction, db);
  } else if (interaction.isButton()) {
    button(client, commandlist, interaction, db);
  } else if (interaction.isSelectMenu()) {
    select(client, commandlist, interaction, db);
  } else if (interaction.isContextMenu()) {
  } else
    return sysLog.error({
      content: `Unknown interaction type when getting interaction: ${interaction.type}`,
      type: 1,
    });
};
