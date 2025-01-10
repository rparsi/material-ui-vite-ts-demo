import { StorageConstraint, StorageDriverInterface } from "./StorageDriverInterface";

export default class LocalStorageDriver implements StorageDriverInterface {
    readonly SEPARATOR: string = '_';

    constructor(){}

    fetch<Type extends StorageConstraint>(entity: Type): Type | null {
        let key = this.generateKey(entity);
        let json = window.sessionStorage.getItem(key);
        if (json === null) {
            return null;
        }

        return JSON.parse(json) as Type;
    }

    generateKey<Type extends StorageConstraint>(entity: Type): string {
        return entity.entityType + this.SEPARATOR + entity.id;
    }

    save<Type extends StorageConstraint>(entity: Type): boolean {
        let key = this.generateKey(entity);
        let json = JSON.stringify(entity);
        window.sessionStorage.setItem(key, json);
        return true;
    }

    delete<Type extends StorageConstraint>(entity: Type): boolean {
        let key = this.generateKey(entity);
        window.sessionStorage.removeItem(key);
        return true;
    }

    clear(): boolean {
        window.sessionStorage.clear();
        return true;
    }

    findIdFromKey(key: string, entityType: string): string | null {
        const parts = key.split(this.SEPARATOR);
        if (parts.length !== 2) {
            return null;
        }

        if (parts[0] !== entityType) {
            return null;
        }

        return parts[1];
    }

    fetchIds(entityType: string): string[] {
        const foundIds: string[] = [];
        
        for (let i = 0; i < window.sessionStorage.length; i++) {
            const key = window.sessionStorage.key(i);
            if (key === null) {
                continue;
            }

            const id = this.findIdFromKey(key, entityType);
            if (id === null) {
                continue;
            }

            foundIds.push(id);
        }

        return foundIds;
    }
};