import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import {ActiveUserInterface} from "../interfaces/active-user.interface";

export const ActiveUser = createParamDecorator(
  (fields: keyof ActiveUserInterface, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user: ActiveUserInterface = request.user;

    return fields ? user[fields] : user;
  },
);
