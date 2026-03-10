import { useContext } from 'react';

import { ThemeProviderContext } from './theme-context';

export const useTheme = () => useContext(ThemeProviderContext);
