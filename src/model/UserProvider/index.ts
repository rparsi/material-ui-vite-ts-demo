import { UserProviderInterface } from "./UserProviderInterface";
import { StorageConstraint, StorageDriverInterface } from "../StorageDriver/StorageDriverInterface";
import LocalStorageDriver from "../StorageDriver";
import { User } from "../entity/User";
import { EntityType } from "../entity/EntityType";
import { generateId } from "../../component/uuid";

export default class UserProvider implements UserProviderInterface {
    protected storageDriver: StorageDriverInterface;

    constructor() {
        this.storageDriver = new LocalStorageDriver();
    }

    fetchCurrentUser(): User | null {
        const userIds = this.storageDriver.fetchIds(EntityType.USER);
        if (userIds.length === 0) {
            return null;
        }

        const storageConstraint: StorageConstraint = {
            id: userIds[0],
            entityType: EntityType.USER
        };
        return this.storageDriver.fetch(storageConstraint) as User;
    }

    createUser(): User {
        const time = new Date();
        const user: User = {
            id: generateId(),
            createdAt: '' + time.getTime(),
            updatedAt: null,
            username: 'guest',
            sessionId: generateId(),
            entityType: EntityType.USER
        };

        return user;
    }
    
    saveUser(user: User): boolean {
        return this.storageDriver.save(user);
    }
};