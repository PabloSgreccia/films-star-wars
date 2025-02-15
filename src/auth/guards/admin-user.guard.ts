import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminUserGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		if (!user || !user.isAdmin) throw new ForbiddenException('Access denied (only administrator users)');
		return true;
	}
}
