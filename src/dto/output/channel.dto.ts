export interface Channel {
    id: string;
    name: string;
    image?: string;
    xp: number;
    primary: boolean;    
    activated: boolean;
    createdAt: Date;
    updatedAt: Date;
}
