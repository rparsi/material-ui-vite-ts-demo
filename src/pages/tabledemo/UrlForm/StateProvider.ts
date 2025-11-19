import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import isValidUrl from '../../../model/validator/url';

export enum StatusColour {
    DEFAULT = 'text.secondary',
    WAITING_FOR_INPUT = 'text.secondary',
    INVALID = 'error.main',
    VALID = 'success.main'
}

export enum ValidationMessage {
    DEFAULT = 'This is a required field',
    WAITING_FOR_INPUT = 'This is a required field',
    INVALID = 'This is not a valid URL',
    VALID = 'Url is valid'
}

export type UrlFormState = {
    url: string | null;
    isValid: boolean;
    statusColour: StatusColour;
    statusIcon: typeof CheckCircleOutline | typeof ErrorOutline;
    validationMessage: ValidationMessage;
};

export default class StateProvider {
    fetchStatusColour(urlFormState: UrlFormState): StatusColour {
        if (urlFormState.url === null || urlFormState.url.length === 0) {
            return StatusColour.WAITING_FOR_INPUT;
        }

        if (urlFormState.isValid) {
            return StatusColour.VALID;
        }

        return StatusColour.INVALID;
    }

    fetchStatusIcon(urlFormState: UrlFormState): typeof CheckCircleOutline | typeof ErrorOutline {
        if (!urlFormState.isValid && urlFormState.url !== null && urlFormState.url.length > 0) {
            return ErrorOutline;
        }
        return CheckCircleOutline;
    }

    fetchValidationMessage(urlFormState: UrlFormState): ValidationMessage {
        if (urlFormState.isValid) {
            return ValidationMessage.VALID;
        }
        if (urlFormState.url !== null && urlFormState.url.length > 0) {
            return ValidationMessage.INVALID;
        }
        return ValidationMessage.WAITING_FOR_INPUT;
    }

    fetchDefault(): UrlFormState {
        return {
            url: null,
            isValid: false,
            statusColour: StatusColour.DEFAULT,
            statusIcon: CheckCircleOutline,
            validationMessage: ValidationMessage.DEFAULT
        };
    }

    fetchForUrl(url: string | null): UrlFormState {
        const updatedState = this.fetchDefault();
        updatedState.url = url;
        updatedState.isValid = isValidUrl(url);
        updatedState.statusColour = this.fetchStatusColour(updatedState);
        updatedState.statusIcon = this.fetchStatusIcon(updatedState);
        updatedState.validationMessage = this.fetchValidationMessage(updatedState);
        return updatedState;
    }
};