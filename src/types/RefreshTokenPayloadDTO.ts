export type RefreshTokenPayloadDTO = {
    id: number;
    name: string;
    email: string;
    iat?: number;
    exp?: number;
};