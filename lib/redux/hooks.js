// Correcting case and wrapping hooks in functions
import { useDispatch, useSelector, useStore } from 'react-redux';

// Export pre-typed hooks that wrap the original Redux hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export const useAppStore = () => useStore();
