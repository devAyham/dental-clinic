export type JwtPayload = {
    phone: string,
    userId: number
}

export type JwtPayloadWithRefreshToken = JwtPayload & {
    refreshToken: string
}