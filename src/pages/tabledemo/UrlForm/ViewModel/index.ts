import { useState, useCallback } from 'react';
import StateProvider, { UrlFormState } from '../StateProvider';

export type ViewModel = {
    state: UrlFormState;
    // Event handlers to be bound to DOM elements
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: () => void;
};

export default function useViewModel(): ViewModel {
    const stateProvider = new StateProvider();
    const [urlFormState, setUrlFormState] = useState<UrlFormState>(stateProvider.fetchDefault());

    const applyUrl = useCallback((url: string | null) => {
        const updatedState = stateProvider.fetchForUrl(url);
        setUrlFormState(updatedState);
    }, []);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => applyUrl(event.target.value), [applyUrl]);
    const handleClick = useCallback(() => applyUrl(urlFormState.url), [urlFormState.url, applyUrl]);

    return {
        state: urlFormState,
        handleChange,
        handleClick
    }
}