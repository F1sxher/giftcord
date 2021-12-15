import { Client, Interaction } from "discord.js";
import { CommandList, Database } from "../../types.bot";
import interactionHandler from "./interactions/handler";

export default (
  client: Client,
  commandlist: CommandList,
  ctx: Interaction,
  db: Database,
  file?: any
) => {
  if (ctx instanceof Interaction) {
    interactionHandler(client, commandlist, ctx, db);
  }
};
