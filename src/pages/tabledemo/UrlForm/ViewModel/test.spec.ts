// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act,  } from '@testing-library/react';

vi.mock('@mui/icons-material', () => ({
    // Define a simple mock component for CheckCircleOutline
    CheckCircleOutline: () => '<div data-testid="MockCheckCircle">CheckIcon</div>',
  
    // Define a simple mock component for ErrorOutline
    ErrorOutline: () => '<div data-testid="MockErrorOutline">ErrorIcon</div>'
}));
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';

vi.mock(import('../StateProvider'), async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        default: vi.fn().mockImplementation(() => {
            return {
                fetchDefault: mockFetchDefault,
                fetchForUrl: mockFetchForUrl,
            };
        })
    };
});

import useViewModel, { ViewModel } from './index';
import { UrlFormState, StatusColour, ValidationMessage } from '../StateProvider';

const validUrl = 'http://example.com';
const invalidUrl = 'not-a-url';

const defaultState: UrlFormState = {
    url: null,
    isValid: false,
    statusColour: StatusColour.DEFAULT,
    statusIcon: CheckCircleOutline,
    validationMessage: ValidationMessage.DEFAULT
};

const invalidUrlState: UrlFormState = {
    url: invalidUrl,
    isValid: false,
    statusColour: StatusColour.INVALID,
    statusIcon: ErrorOutline,
    validationMessage: ValidationMessage.INVALID
};

const validUrlState: UrlFormState = {
    url: validUrl,
    isValid: true,  
    statusColour: StatusColour.VALID,
    statusIcon: CheckCircleOutline,
    validationMessage: ValidationMessage.VALID
};

const mockFetchDefault = vi.fn().mockReturnValue(defaultState);
const mockFetchForUrl = vi.fn((url: string | null) => {
    if (url === validUrl) return validUrlState;
    if (url === invalidUrl) return invalidUrlState;
    return defaultState;
});

describe('useViewModel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockFetchDefault.mockClear();
        mockFetchForUrl.mockClear();
    });

    it('should initialize with the default state from StateProvider', () => {
        // 1. Render the hook
        const { result } = renderHook(() => useViewModel());
        const viewModel: ViewModel = result.current;

        // 2. Check the initial state
        expect(mockFetchDefault).toHaveBeenCalledTimes(1);
        expect(viewModel.state).toEqual(defaultState);
    });

    // --- Test handleChange ---
    it('should update state when handleChange is called with a valid URL', () => {
        // 1. Render the hook
        const { result } = renderHook(() => useViewModel());

        // 2. Simulate input change (handleChange)
        act(() => {
             // Mock the event object structure for React.ChangeEvent<HTMLInputElement>
            result.current.handleChange({
                target: { value: validUrl }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        // 3. Check that the StateProvider was called correctly and the state updated
        expect(mockFetchForUrl).toHaveBeenCalledOnce();
        expect(mockFetchForUrl).toHaveBeenCalledWith(validUrl);
        expect(result.current.state).toEqual(validUrlState);
    });

    it('should update state when handleChange is called with an invalid URL', () => {
        // 1. Render the hook
        const { result } = renderHook(() => useViewModel());

        // 2. Simulate input change (handleChange)
        act(() => {
            result.current.handleChange({
                target: { value: invalidUrl }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        // 3. Check the state updated to the invalid state
        expect(mockFetchForUrl).toHaveBeenCalledOnce();
        expect(mockFetchForUrl).toHaveBeenCalledWith(invalidUrl);
        expect(result.current.state).toEqual(invalidUrlState);
    });

    // --- Test handleClick ---
    it('should call StateProvider.fetchForUrl with the current state url when handleClick is called', () => {
        const { result } = renderHook(() => useViewModel());

        // 1. First, update the state to a known value (e.g., a valid URL)
        act(() => {
            result.current.handleChange({
                target: { value: validUrl }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        // Verify the state is updated
        expect(result.current.state.url).toBe(validUrl);
        
        // 2. Simulate button click (handleClick)
        act(() => {
            result.current.handleClick();
        });

        // 3. Check that StateProvider was called with the *current* URL
        // The fetchForUrl should be called twice: once for handleChange, once for handleClick.
        expect(mockFetchForUrl).toHaveBeenCalledTimes(2);
        expect(mockFetchForUrl).toHaveBeenNthCalledWith(2, validUrl); 
        
        expect(result.current.state).toEqual(validUrlState);
    });

    it('should handle the initial empty URL when handleClick is called without prior change', () => {
        const { result } = renderHook(() => useViewModel());

        // 1. Simulate button click (handleClick)
        act(() => {
            result.current.handleClick();
        });

        expect(result.current.state.url).toBeNull();

        // 2. Check that StateProvider was called with the initial empty URL
        expect(mockFetchForUrl).toHaveBeenCalledTimes(1);
        expect(mockFetchForUrl).toHaveBeenCalledWith(null);
        expect(result.current.state).toEqual(defaultState);
    });
});