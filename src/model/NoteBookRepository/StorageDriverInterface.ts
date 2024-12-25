type IdConstraint = {
    id: number | string;
};

type KeyPreffixConstraint = {
    keyPreffix: string | null;
}

export type StorageConstraint = IdConstraint & KeyPreffixConstraint;

export interface StorageDriverInterface {
    save<Type extends StorageConstraint>(entity: Type): boolean;
    delete<Type extends StorageConstraint>(entity: Type): boolean;
    clear(): boolean;
};