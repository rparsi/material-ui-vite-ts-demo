import { StorageConstraint, StorageDriverInterface } from "./StorageDriverInterface";

class LocalStorageDriver implements StorageDriverInterface {
    fetch<Type extends StorageConstraint>(entity: Type): Type | null {
        let key = this.generateKey(entity);
        let json = window.sessionStorage.getItem(key);
        if (json === null) {
            return null;
        }

        return JSON.parse(json) as Type;
    }

    generateKey<Type extends StorageConstraint>(entity: Type): string {
        return entity.keyPreffix + '_' + entity.id;
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
};

export default LocalStorageDriver;