import { EntityTrait } from "./EntityTrait";
import { Note } from "./Note";
import { User } from "./User";

export type NoteBook = EntityTrait & {
    user: User;
    /**
     * There are different ways to declare an array that are nearly the same but NOT exactly the same.
     * 
     * Array<type> is same as type[] with the only real difference being that the first format
     * is using Generics.  Array<type> is typically used when the array can contain different types.
     * They're effectively equivalent though, so doesn't really matter which you use.
     * 
     * [Type] notation is for defining a fixed size array (a Tuple)
     */
    notes: Note[];
};