import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import LocalStorageDriver from "../StorageDriver";
import { User } from "../entity/User";
import { NoteBook } from '../entity/NoteBook';
import { generateId } from "../../component/uuid";
import { Note } from '../entity/Note';
import NoteBookRepository from '.';
import { EntityType } from '../entity/EntityType';

vi.mock("../../component/uuid", () => {
    const mockedGenerateId = vi.fn();

    return { generateId: mockedGenerateId };
});

vi.mock("./LocalStorageDriver");

let expectedTime: string = '';
const user: User = {
    id: '100',
    username: 'test',
    sessionId: 's-id',
    createdAt: 'now',
    updatedAt: null,
    entityType: EntityType.USER
};
const expectedNote: Note = {
    id: '200',
    name: 'first note',
    content: 'my first note',
    createdAt: expectedTime,
    updatedAt: null,
    entityType: EntityType.NOTE
};
const expectedNoteBook: NoteBook = {
    id: '300',
    createdAt: expectedTime,
    updatedAt: null,
    user: user,
    notes: [expectedNote],
    entityType: EntityType.NOTEBOOK
};

describe('Testing NoteBookRepository class', () => {
    beforeEach(() => {
        // tell vitest we use mocked time
        vi.useFakeTimers();
        const date = new Date(2000, 1, 1, 13);
        vi.setSystemTime(date);
        expectedTime = '' + date.getTime();
        expectedNote.createdAt = expectedTime;
        expectedNoteBook.createdAt = expectedTime;
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });
  
    it('test create method', () => {
        vi.mocked(generateId).mockReturnValueOnce(expectedNote.id);
        vi.mocked(generateId).mockReturnValueOnce(expectedNoteBook.id);

        const noteBookRepository = new NoteBookRepository();
        const result = noteBookRepository.create(user);
        expect(generateId).toHaveBeenCalledTimes(2);
        expect(result).toMatchObject(expectedNoteBook);
    });

    it('test save method', () => {
        const spy = vi.spyOn(LocalStorageDriver.prototype, 'save').mockImplementation(() => true);

        const noteBookRepository = new NoteBookRepository();
        const result = noteBookRepository.save(expectedNoteBook);
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(expectedNoteBook);
        expect(result).toEqual(true);
    });

    it('test delete method', () => {
        const spy = vi.spyOn(LocalStorageDriver.prototype, 'delete').mockImplementation(() => true);

        const noteBookRepository = new NoteBookRepository();
        const result = noteBookRepository.delete(expectedNoteBook);
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(expectedNoteBook);
        expect(result).toEqual(true);
    });
});