import { createParamDecorator } from '@nestjs/common'
import { JwtPayloadWithRefreshToken } from '../types/JwtPayloadTypes'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (data: keyof JwtPayloadWithRefreshToken | undefined,
        context: ExecutionContext
    ) => {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req
        if (data) return req.user[data]

        return req.user
    },
)