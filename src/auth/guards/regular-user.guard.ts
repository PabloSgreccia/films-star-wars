import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RegularUserGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user || user.isAdmin) {
			throw new ForbiddenException('Access denied (only regular users)');
		}
		return true;
	}
}
