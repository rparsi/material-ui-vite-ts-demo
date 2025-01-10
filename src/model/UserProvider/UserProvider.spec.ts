import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import LocalStorageDriver from "../StorageDriver";
import { User } from "../entity/User";
import { generateId } from "../../component/uuid";
import UserProvider from '.';
import { EntityType } from '../entity/EntityType';
import { StorageConstraint } from '../StorageDriver/StorageDriverInterface';

vi.mock("../../component/uuid", () => {
    const mockedGenerateId = vi.fn();

    return { generateId: mockedGenerateId };
});

vi.mock("./LocalStorageDriver");

let expectedTime: string = '';
const user: User = {
    id: '100',
    username: 'guest',
    sessionId: 's-id',
    createdAt: 'now',
    updatedAt: null,
    entityType: EntityType.USER
};

describe('Testing UserProvider class', () => {
    beforeEach(() => {
        // tell vitest we use mocked time
        vi.useFakeTimers();
        const date = new Date(2000, 1, 1, 13);
        vi.setSystemTime(date);
        expectedTime = '' + date.getTime();
        user.createdAt = expectedTime;
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('test fetchCurrentUser when user data IS NOT found', () => {
        const spy = vi.spyOn(LocalStorageDriver.prototype, 'fetchIds').mockImplementation(() => []);

        const userProvider = new UserProvider();
        const result = userProvider.fetchCurrentUser();
        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(EntityType.USER);
        expect(result).toBeNull();
    });

    it('test fetchCurrentUser when user data IS found', () => {
        const spyFetchIds = vi.spyOn(LocalStorageDriver.prototype, 'fetchIds').mockImplementation(() => [user.id]);
        const spyFetch = vi.spyOn(LocalStorageDriver.prototype, 'fetch').mockImplementation(() => user);
        const expectedStorageConstraint: StorageConstraint = {
            id: user.id,
            entityType: user.entityType
        };

        const userProvider = new UserProvider();
        const result = userProvider.fetchCurrentUser();
        expect(spyFetchIds).toHaveBeenCalledOnce();
        expect(spyFetchIds).toHaveBeenCalledWith(EntityType.USER);
        expect(spyFetch).toHaveBeenCalledOnce();
        expect(spyFetch).toHaveBeenCalledWith(expectedStorageConstraint);
        expect(result).toMatchObject(user);
    });

    it('test createUser', () => {
        vi.mocked(generateId).mockReturnValueOnce(user.id);
        vi.mocked(generateId).mockReturnValueOnce(user.sessionId);

        const userProvider = new UserProvider();
        const result = userProvider.createUser();
        expect(generateId).toHaveBeenCalledTimes(2);
        expect(result).toMatchObject(user);
    });

    it('test saveUser', () => {
        const spy = vi.spyOn(LocalStorageDriver.prototype, 'save').mockImplementation(() => true);

        const userProvider = new UserProvider();
        const result = userProvider.saveUser(user);
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(user);
        expect(result).toEqual(true);
    });
});