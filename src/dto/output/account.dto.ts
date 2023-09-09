export enum PlatformEnum {
    DISCORD = "discord",
    TWITCH = "twitch",
}


export interface Account {
  id: string;
  // account
  type: PlatformEnum;
  pseudo: string;
  image?: string;
  // core
  xp: number;
  primary: boolean;
  activated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
