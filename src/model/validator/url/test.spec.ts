import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import isValidUrl from '.';

const validUrl = 'https://www.somewhere.com';
const invalidUrl = 'foobar';
const spacesFilledUrl = '   ';
const mockedTest = vi.fn();

describe('Testing isValidUrl', () => {
    let regExpSpy: MockInstance;

    beforeEach(() => {
        regExpSpy = vi.spyOn(globalThis, 'RegExp').mockImplementation((pattern, flags) => {
            return {
                test: mockedTest
            } as unknown as RegExp
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });
  
    it('should return false for null', () => {
        const result = isValidUrl(null);
        expect(result).toBe(false);
        expect(mockedTest).not.toHaveBeenCalled();
    });

    it('should return false for empty string', () => {
        const result = isValidUrl('');
        expect(result).toBe(false);
        expect(mockedTest).not.toHaveBeenCalled();
    });

    it('should return false for string filled with spaces', () => {
        vi.mocked(mockedTest).mockReturnValueOnce(false);

        const result = isValidUrl(spacesFilledUrl);
        expect(result).toBe(false);
        expect(mockedTest).toBeCalledTimes(1);
        expect(mockedTest).toBeCalledWith(spacesFilledUrl);
    });

    it('should return false for invalid url', () => {
        vi.mocked(mockedTest).mockReturnValueOnce(false);

        const result = isValidUrl(invalidUrl);
        expect(result).toBe(false);
        expect(mockedTest).toBeCalledTimes(1);
        expect(mockedTest).toBeCalledWith(invalidUrl);
    });

    it('should return true for valid url', () => {
        vi.mocked(mockedTest).mockReturnValueOnce(true);

        const result = isValidUrl(validUrl);
        expect(result).toBe(true);
        expect(mockedTest).toBeCalledTimes(1);
        expect(mockedTest).toBeCalledWith(validUrl);
    });
});