import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext } from '@nestjs/common'
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super();
    }
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
    }
}