import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader)
      throw new UnauthorizedException("Authorization header not found");

    const token = authHeader.split(" ")[1];
    if (!token) throw new UnauthorizedException("Token not found");

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      // foydalanuvchini request ga joylaymiz
      req.user = decoded;

      if (!decoded.is_active)
        throw new UnauthorizedException("User is not active");

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: "Invalid or expired token",
        error: error.message,
      });
    }
  }
}
