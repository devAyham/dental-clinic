import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { CurrentUser } from "../decorators/currentUser.decorator";
import { PrismaClient } from "@prisma/client";
import { CurrentUserId } from "../decorators/currentUserId.decorator";
import { GraphQLError } from 'graphql';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super()
    }

    getRequest(context: ExecutionContext) {
    console.log(' getRequest AccessTokenGuard' ,);

        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log(' getRequest canActivate' ,);

        const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()])
        // console.log(context);
        if (isPublic) {
            return true
        }

        return super.canActivate(context)
 
    }
}

