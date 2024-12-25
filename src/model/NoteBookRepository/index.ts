import { NoteBook } from "../entity/NoteBook";
import { Note } from "../entity/Note";
import { User } from "../entity/User";
import LocalStorageDriver from "./LocalStorageDriver";
import { StorageDriverInterface } from "./StorageDriverInterface";
import { generateId } from "../../component/uuid";

class NoteBookRepository {
    storageDriver: StorageDriverInterface;

    constructor() {
        this.storageDriver = new LocalStorageDriver();
    }

    create(user: User): NoteBook {
        const time = new Date();
        const note: Note = {
            id: generateId(),
            name: 'first note',
            content: 'my first note',
            createdAt: '' + time.getTime(),
            updatedAt: null,
            keyPreffix: 'note'
        } as Note;

        const noteBook: NoteBook = {
            id: generateId(),
            createdAt: '' + time.getTime(),
            updatedAt: null,
            user: user,
            notes: [note],
            keyPreffix: 'notebook'
        } as NoteBook;

        return noteBook;
    }

    save(noteBook: NoteBook): boolean {
        return this.storageDriver.save(noteBook);
    }

    delete(noteBook: NoteBook): boolean {
        return this.storageDriver.delete(noteBook);
    }
};

export default NoteBookRepository;