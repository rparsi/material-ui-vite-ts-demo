import { EntityTrait } from "./EntityTrait";

export type Note = EntityTrait & {
    name: string;
    content: string;
};