import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminAuthGuard implements CanActivate {
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

      if (decoded.role !== "ADMIN") {
        throw new ForbiddenException("Only admins can access this resource");
      }

      if (!decoded.is_active) {
        throw new ForbiddenException("Admin is not active");
      }

      req.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: "Invalid or expired admin token",
        error: error.message,
      });
    }
  }
}
