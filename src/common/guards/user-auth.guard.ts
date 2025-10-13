import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
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

      req.user = decoded;

      if (decoded.role === "ADMIN" && decoded.is_creator !== undefined) {
        if (!decoded.is_active)
          throw new ForbiddenException("Admin is not active");
      } else {
        if (!decoded.is_active)
          throw new ForbiddenException("User is not active");
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: "Invalid or expired token",
        error: error.message,
      });
    }
  }
}
