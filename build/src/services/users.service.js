import { PlatformEnum } from "../dto/output/account.dto.js";
const exampleAccount = { id: "uid-123456", type: PlatformEnum.DISCORD, pseudo: "JOHN CENNA PAPALAPA", xp: 524, primary: true, activated: true, createdAt: new Date(), updatedAt: new Date() };
export class UsersService {
    get(id) {
        return {
            id,
            accounts: [exampleAccount],
            premium: true,
            money: 3654,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
    create(userCreationParams) {
        const newAccount = exampleAccount;
        return {
            id: "6458645",
            premium: false,
            money: 0,
            accounts: [newAccount],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
