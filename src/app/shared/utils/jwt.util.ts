import jwt_decode from 'jwt-decode';

export class JwtUtil {
  static decodePayloadJWT(token: string | null): any {
    try {
      if (!token) return null;
      return jwt_decode(token);
    } catch (err: any) {
      console.error(`decodePayloadJWT: ${err.message}`);
      return null;
    }
  }
}
