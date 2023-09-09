import { Account } from "./account.dto.js";

export interface User {
  id: string;

  // relations
  accounts: Account[];

  // core
  premium: boolean;
  money: number;
  // misc
  createdAt: Date;
  updatedAt: Date;
}
