import { EntityType } from "./EntityType";

export type EntityTrait = {
    id: string;
    createdAt: string;
    updatedAt: string | null;
    entityType: EntityType | null;
};