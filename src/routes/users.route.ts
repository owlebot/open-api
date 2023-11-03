import { UsersService, AccountCreationParams } from "../services/users.service.js";
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Security,
} from "tsoa";
import { User } from "../dto/output/user.dto.js";


@Route("users")
export class UsersController extends Controller {
  usersService = new UsersService()

  @Get("{userId}")
  public async getUser(
      @Path() userId: string,
    // @Query() name?: string
  ): Promise<User> {
    return this.usersService.get(userId);
  }

  @SuccessResponse("201", "User created") // Custom success response
  @Post()
  @Security("api_key")
  public async createUser(
    @Body() requestBody: AccountCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    this.usersService.create(requestBody);
    return;
  }
}

