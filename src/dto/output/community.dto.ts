import { Channel } from "./channel.dto.js";

export interface Community {
    id: string;
    channels: Channel[];
    ownerId: string;
    name: string;
    image?: string;
    description?: string;
    premium: boolean;
    money: number;
    createdAt: Date;
    updatedAt: Date;
}
