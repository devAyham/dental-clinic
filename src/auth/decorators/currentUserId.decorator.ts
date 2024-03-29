import { createParamDecorator } from '@nestjs/common'
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types/JwtPayloadTypes'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ExecutionContext } from '@nestjs/common'

export const CurrentUserId = createParamDecorator(
    (
        _: undefined,
        context: ExecutionContext
    ) => {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req
        return req.user.userId as JwtPayload
    },
)