import { User } from 'src/entities/user.entity';

export const mockRegularUser: User = { id: 1, username: 'regularUser', password: 'Valid1', isAdmin: false } as User;
export const mockAdminUser: User = { id: 1, username: 'adminUser', password: 'Validadminpass123', isAdmin: true } as User;
