import { EntityTrait } from "./EntityTrait";

export type User = EntityTrait & {
    username: string;
    sessionId: string;
};