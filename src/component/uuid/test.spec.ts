import { afterEach, describe, expect, it, vi } from 'vitest';
import { nanoid } from 'nanoid';
import { generateId } from '.';

const id = 'test-id';

vi.mock('nanoid', () => {
    const mockedNanoid = vi.fn();

    return { nanoid: mockedNanoid };
});

describe('Testing uuid generation', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
  
    it('should return "test-id"', () => {
        vi.mocked(nanoid).mockReturnValue(id);
        expect(generateId()).toEqual(id);
        expect(nanoid).toHaveBeenCalledOnce();
    });
});