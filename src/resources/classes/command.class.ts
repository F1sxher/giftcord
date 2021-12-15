import {
  ButtonInteraction,
  Client,
  CommandInteraction,
  ContextMenuInteraction,
  SelectMenuInteraction,
} from "discord.js";
import {
  CommandConfig,
  CommandArgs,
  ResponseArgs,
  CommandList,
  Database,
} from "../../types.bot";

export default abstract class Command {
  public config: CommandConfig;
  public configarguments?: CommandArgs;
  public arguments?: ResponseArgs;

  constructor(
    cConfig: {
      name: string;
      description: string;
      ucategory: string;
      category?: string;
      rootCategory?: string;
      usage: string;
      aliases?: string[];
      devOnly: boolean;
      guildOnly: boolean;
      userPermissions?: any[];
      clientPermissions?: any[];
    },
    args?: CommandArgs
  ) {
    this.config = cConfig;
    if (args) this.configarguments = args;
  }

  public abstract execute(
    client: Client,
    message: CommandInteraction | ContextMenuInteraction,
    args: ResponseArgs,
    commandlist: CommandList,
    db: Database
  ): Promise<void>;

  public abstract button(
    client: Client,
    button: ButtonInteraction,
    id: string,
    commandlist: CommandList,
    db: Database
  ): Promise<void>;

  public abstract select(
    client: Client,
    message: SelectMenuInteraction,
    id: string,
    commandlist: CommandList,
    db: Database
  ): Promise<void>;
}
