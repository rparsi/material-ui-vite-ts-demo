import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@mui/icons-material', () => ({
  // Define a simple mock component for CheckCircleOutline
  CheckCircleOutline: () => '<div data-testid="MockCheckCircle">CheckIcon</div>',
  
  // Define a simple mock component for ErrorOutline
  ErrorOutline: () => '<div data-testid="MockErrorOutline">ErrorIcon</div>'
}));

vi.mock('../../../../model/validator/url', () => {
    return { default: vi.fn() };
});

import isValidUrl from '../../../../model/validator/url';
const mockedIsValidUrl = vi.mocked(isValidUrl);

import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import StateProvider, { StatusColour, ValidationMessage, UrlFormState } from './index';

describe('Testing StateProvider', () => {
    const url = 'https://www.somewhere.com';
    let urlFormState: UrlFormState;
    const stateProvider = new StateProvider();

    beforeEach(() => {
        urlFormState = {
            url,
            isValid: true,
            statusColour: StatusColour.DEFAULT,
            statusIcon: CheckCircleOutline,
            validationMessage: ValidationMessage.DEFAULT
        };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });
  
    it('test fetchStatusColour: url is null or empty string', () => {
        urlFormState.url =  null;

        let result = stateProvider.fetchStatusColour(urlFormState);
        expect(result).toBe(StatusColour.WAITING_FOR_INPUT);

        urlFormState.url = '';
        result = stateProvider.fetchStatusColour(urlFormState);
        expect(result).toBe(StatusColour.WAITING_FOR_INPUT);
        
        expect(mockedIsValidUrl).not.toHaveBeenCalled();
    });

    it('test fetchStatusColour: UrlFormState is valid or invalid', () => {
        let result = stateProvider.fetchStatusColour(urlFormState);
        expect(result).toBe(StatusColour.VALID);

        urlFormState.isValid = false;
        result = stateProvider.fetchStatusColour(urlFormState);
        expect(result).toBe(StatusColour.INVALID);

        expect(mockedIsValidUrl).not.toHaveBeenCalled();
    });

    it('test fetchIconStatus', () => {
        let result = stateProvider.fetchStatusIcon(urlFormState);
        expect(result).toBe(CheckCircleOutline);

        urlFormState.isValid = false;
        result = stateProvider.fetchStatusIcon(urlFormState);
        expect(result).toBe(ErrorOutline);

        urlFormState.url = null;
        result = stateProvider.fetchStatusIcon(urlFormState);
        expect(result).toBe(CheckCircleOutline);

        expect(mockedIsValidUrl).not.toHaveBeenCalled();
    });

    it('test fetchValidationMessage', () => {
        let result = stateProvider.fetchValidationMessage(urlFormState);
        expect(result).toBe(ValidationMessage.VALID);

        urlFormState.isValid = false;
        result = stateProvider.fetchValidationMessage(urlFormState);
        expect(result).toBe(ValidationMessage.INVALID);

        urlFormState.url = null;
        result = stateProvider.fetchValidationMessage(urlFormState);
        expect(result).toBe(ValidationMessage.WAITING_FOR_INPUT);

        expect(mockedIsValidUrl).not.toHaveBeenCalled();
    });

    it('test fetchDefault', () => {
        const result = stateProvider.fetchDefault();
        expect(result.url).toBeNull();
        expect(result.isValid).toBe(false);
        expect(result.statusColour).toBe(StatusColour.DEFAULT);
        expect(result.statusIcon).toBe(CheckCircleOutline);
        expect(result.validationMessage).toBe(ValidationMessage.DEFAULT);

        expect(mockedIsValidUrl).not.toHaveBeenCalled();
    });

    it('test fetchForUrl', () => {
        mockedIsValidUrl.mockImplementation((inputUrl: string | null) => {
            if (inputUrl) return true;
            return false;
        });

        let result = stateProvider.fetchForUrl(null);
        expect(result.url).toBeNull();
        expect(result.isValid).toBe(false);
        expect(result.statusColour).toBe(StatusColour.WAITING_FOR_INPUT);
        expect(result.statusIcon).toBe(CheckCircleOutline);
        expect(result.validationMessage).toBe(ValidationMessage.WAITING_FOR_INPUT);

        result = stateProvider.fetchForUrl(url);
        expect(result.url).toBe(url);
        expect(result.isValid).toBe(true);
        expect(result.statusColour).toBe(StatusColour.VALID);
        expect(result.statusIcon).toBe(CheckCircleOutline);
        expect(result.validationMessage).toBe(ValidationMessage.VALID);

        expect(mockedIsValidUrl).toHaveBeenCalledTimes(2);
        expect(mockedIsValidUrl).toHaveBeenNthCalledWith(1, null);
        expect(mockedIsValidUrl).toHaveBeenNthCalledWith(2, url);
    });
});