import { StorageConstraint, StorageDriverInterface } from "./StorageDriverInterface";

class LocalStorageDriver implements StorageDriverInterface {
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