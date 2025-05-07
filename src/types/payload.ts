export interface JwtPayload {
  sub: number;
  username: string;
  admin: boolean;
  exp: number;
  iat: number;
}