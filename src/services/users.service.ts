// src/users/usersService
import { User } from "../dto/output/user.dto.js";
import { Account, PlatformEnum } from "../dto/output/account.dto.js";
import { Channel } from "../dto/output/channel.dto.js";
import { Community } from "../dto/output/community.dto.js";

export type AccountCreationParams = Pick<Account, "id" | "type" | "pseudo" | "image">;
    
const exampleAccount : Account = {id: "uid-123456", type: PlatformEnum.DISCORD, pseudo: "JOHN CENNA PAPALAPA", xp: 524, primary: true, activated: true, createdAt: new Date(), updatedAt: new Date()}

export class UsersService {
  public get(id: string): User {
    return {
      id,
      accounts: [exampleAccount],
      premium: true,
      money: 3654,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  public create(userCreationParams: AccountCreationParams): User {
    const newAccount : Account = exampleAccount
    return {
      id: "6458645", // Random
      premium: false,
      money: 0,
      accounts: [newAccount],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

