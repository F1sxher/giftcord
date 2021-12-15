import {
  Client,
  CommandInteraction,
  GuildMember,
  PermissionResolvable,
} from "discord.js";
import { Database } from "../../types.bot";

const checkClientPerms = async (
  client: Client,
  message: CommandInteraction,
  permissions: PermissionResolvable[] | undefined
) => {
  let botId: any = client.user?.id;
  let botUser = await message.guild?.members.fetch(botId);
  let OK = true;

  if (!permissions) return OK;

  if (botUser) {
    permissions.forEach((permission) => {
      if (!botUser?.permissions.has(permission)) return (OK = false);
    });
    return OK;
  }
  return false;
};

const checkUserPerms = async (
  message: CommandInteraction,
  permissions: PermissionResolvable[] | undefined,
  db: Database
) => {
  let OK = true;

  if (!permissions) return OK;

  permissions.forEach((permission) => {
    if (!message.memberPermissions?.has(permission)) return (OK = false);
  });

  return OK;
};

export default {
  checkClientPerms,
  checkUserPerms,
};
