import { User } from "../entity/User";

export interface UserProviderInterface {
    fetchCurrentUser(): User | null;
    createUser(): User;
    saveUser(user: User): boolean;
};