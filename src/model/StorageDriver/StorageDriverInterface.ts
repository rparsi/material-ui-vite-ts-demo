type IdConstraint = {
    id: number | string;
};

type EntityTypeConstraint = {
    entityType: string | null;
}

export type StorageConstraint = IdConstraint & EntityTypeConstraint;

export interface StorageDriverInterface {
    fetch<Type extends StorageConstraint>(entity: Type): Type | null;
    save<Type extends StorageConstraint>(entity: Type): boolean;
    delete<Type extends StorageConstraint>(entity: Type): boolean;
    clear(): boolean;
    findIdFromKey(key: string, entityType: string): string | null;
    fetchIds(entityType: string): string[];
};