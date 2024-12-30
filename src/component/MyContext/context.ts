import { createContext } from 'react';
import { User } from '../../model/entity/User';

export const UserContext = createContext<User | null>(null);