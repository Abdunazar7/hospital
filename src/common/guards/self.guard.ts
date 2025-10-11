import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user)
      throw new ForbiddenException("User information not found in request");

    // id ni integer yoki string bo‘lishiga moslashtiramiz
    const paramId = Number(request.params.id);

    if (user.id !== paramId) {
      throw new ForbiddenException(
        "You are not authorized to access this resource"
      );
    }

    return true;
  }
}
