import { afterEach, describe, expect, it, vi } from 'vitest';
import LocalStorageDriver from "./LocalStorageDriver";
import { StorageConstraint } from "./StorageDriverInterface";
import { EntityType } from '../entity/EntityType';

vi.stubGlobal('window', {
    sessionStorage: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
    }
});

type TestType = StorageConstraint & {
    dummy: boolean | null;
};

const id = '100';
const expectedKey = 'USER_100';
const testEntity: TestType = {
    id: id,
    entityType: EntityType.USER,
    dummy: true
};
const expectedValue = JSON.stringify(testEntity);

const localStorageDriver = new LocalStorageDriver();

describe('Testing LocalStorageDriver', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
  
    it('generateKey should return "USER_100"', () => {
        const result = localStorageDriver.generateKey(testEntity);
        expect(result).toEqual(expectedKey);
    });

    it('test save method', () => {
        const result = localStorageDriver.save(testEntity);
        expect(result).toEqual(true);
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(expectedKey, expectedValue);
        expect(window.sessionStorage.setItem).toHaveBeenCalledOnce();
    });

    it('test delete method', () => {
        const result = localStorageDriver.delete(testEntity);
        expect(result).toEqual(true);
        expect(window.sessionStorage.removeItem).toHaveBeenCalledWith(expectedKey);
        expect(window.sessionStorage.removeItem).toHaveBeenCalledOnce();
    });

    it('test clear method', () => {
        const result = localStorageDriver.clear();
        expect(result).toEqual(true);
        expect(window.sessionStorage.clear).toHaveBeenCalledWith();
        expect(window.sessionStorage.clear).toHaveBeenCalledOnce();
    });

    it('test fetch when entity is NOT found', () => {
        const entity: TestType = {
            ...testEntity,
            dummy: null
        };

        vi.mocked(window.sessionStorage.getItem).mockReturnValue(null);

        const result = localStorageDriver.fetch(entity);
        expect(result).toBeNull();
        expect(window.sessionStorage.getItem).toHaveBeenCalledWith(expectedKey);
        expect(window.sessionStorage.getItem).toHaveBeenCalledOnce();
        expect(entity.dummy).toBeNull();
    });

    it('test fetch when entity IS found and the data from storage is different', () => {
        const entity: TestType = {
            ...testEntity,
            dummy: null
        };
        const foundEntity: TestType = {
            ...testEntity,
            dummy: false
        };
        const expectedJson = JSON.stringify(foundEntity);

        vi.mocked(window.sessionStorage.getItem).mockReturnValue(expectedJson);

        const result = localStorageDriver.fetch(entity);
        expect(window.sessionStorage.getItem).toHaveBeenCalledWith(expectedKey);
        expect(window.sessionStorage.getItem).toHaveBeenCalledOnce();
        expect(result).toMatchObject(foundEntity);
        expect(entity.dummy).toBeNull();
    });
});