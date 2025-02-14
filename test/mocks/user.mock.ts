import { User } from 'src/entities/user.entity';

export const mockRegularUser: User = { id: 1, username: 'regularUser', password: 'hashedRegularPass', isAdmin: false } as User;
export const mockAdminUser: User = { id: 1, username: 'adminUser', password: 'hashedAdminPass', isAdmin: true } as User;
