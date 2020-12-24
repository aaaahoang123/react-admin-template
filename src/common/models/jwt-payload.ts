export interface JwtPayload {
  exp: number; // exprire time,
  iat: number;
  iss: string; // login url
  jti: string;
  nbf: number;
  prv: string;
  sub: string; // user_id
  // is_admin: boolean;
  // roles: Role[];
}

