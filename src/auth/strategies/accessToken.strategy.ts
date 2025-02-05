import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/JwtPayloadTypes';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(public config: ConfigService) {
    console.log(' AccessTokenStrategy constructor');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
      // passReqToCallback: true
    });
  }
  async validate(payload: JwtPayload) {
    console.log(' AccessTokenStrategy validate');

    // var user_id = @CurrentUserId userId;
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        id: payload.userId,
      },
    });
    if (!user || user.hashedRefreshToken == null) {
      throw new GraphQLError('Unauthorized', {
        extensions: { code: 401 },
        // UNAUTHENTICATED
      });
    }

    if (!user.isVerified) {
      throw new GraphQLError(' this account has not verified yet', {
        extensions: { code: 403 },
      });
    }
    payload = {
      ...payload,
      ...user,
    };

    return payload;
  }
}
