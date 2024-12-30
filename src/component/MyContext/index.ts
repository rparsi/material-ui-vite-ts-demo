import { User } from "../../model/entity/User";
import { generateId } from "../uuid";
import NoteBookRepository from "../../model/NoteBookRepository";
import { EntityType } from "../../model/entity/EntityType";

function initializeContext(): void {
    const time = new Date();
    const user: User = {
        id: generateId(),
        createdAt: '' + time.getTime(),
        updatedAt: null,
        username: 'guest',
        sessionId: generateId(),
        entityType: EntityType.USER
    } as User;

    const repository: NoteBookRepository = new NoteBookRepository();
    const noteBook = repository.create(user);

    repository.save(noteBook);
}

export default initializeContext;