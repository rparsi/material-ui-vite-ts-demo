import { afterEach, describe, expect, it, vi } from 'vitest';
import { Consumer, createContext, Provider } from 'react';
import { User } from "../../model/entity/User";
import UserProvider from '../../model/UserProvider';
import { EntityType } from '../../model/entity/EntityType';
import { useCurrentUserContext } from '.';

vi.mock('react', () => {
    return { createContext: vi.fn().mockReturnValue({}) };
});

const user: User = {
    id: '100',
    username: 'guest',
    sessionId: 's-id',
    createdAt: 'now',
    updatedAt: null,
    entityType: EntityType.USER
};

describe('tests the useCurrentUserContext hook', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
  
    it('tests the hook', () => {
        const spyFetchCurrentUser = vi.spyOn(UserProvider.prototype, 'fetchCurrentUser').mockImplementation(() => null);
        const spyCreateUser = vi.spyOn(UserProvider.prototype, 'createUser').mockImplementation(() => user);
        const spySaveUser = vi.spyOn(UserProvider.prototype, 'saveUser').mockImplementation((entity: User) => true);

        const hook = useCurrentUserContext();
        expect(createContext).toHaveBeenCalledWith(null);
        expect(createContext).toHaveBeenCalledOnce();
        expect(spyFetchCurrentUser).toHaveBeenCalledOnce();
        expect(spyCreateUser).toHaveBeenCalledOnce();
        expect(spySaveUser).toHaveBeenCalledOnce();
        expect(spySaveUser).toHaveBeenCalledWith(user);
        expect(hook).toHaveProperty('CurrentUserContext');
        expect(hook).toHaveProperty('currentUser');
        expect(hook.CurrentUserContext).toBeDefined();
        expect(hook.currentUser).toMatchObject(user);
    });
});