import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const role = req.headers['role'];
    if (!role) throw new UnauthorizedException('Role is missing');
    req.user = { role };
    next();
  }
}
