import { createContext } from 'react';
import { User } from "../../model/entity/User";
import UserProvider from '../../model/UserProvider';

export type CurrentUserContextInfo = {
    CurrentUserContext: React.Context<User | null>;
    currentUser: User;
};

export function useCurrentUserContext(): CurrentUserContextInfo {
    const currentUserContext = createContext<User | null>(null);
    const userProvider: UserProvider = new UserProvider();

    let user: User | null = userProvider.fetchCurrentUser();
    if (user === null) {
        user = userProvider.createUser();
    }

    userProvider.saveUser(user);

    return {
        CurrentUserContext: currentUserContext,
        currentUser: user
    } as CurrentUserContextInfo;
};