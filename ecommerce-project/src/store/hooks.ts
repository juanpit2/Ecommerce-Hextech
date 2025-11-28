// Hooks tipados de Redux para usar en componentes
// Proporcionan type safety completo en TypeScript
// Evitan tener que tipar manualmente en cada componente

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";


// Hook tipado para dispatch
// Uso: const dispatch = useAppDispatch()
// Conoce todos los tipos de actions disponibles
export const useAppDispatch: () => AppDispatch = useDispatch;


// Hook tipado para selector
// Uso: const items = useAppSelector(state => state.cart.items)
// Autocompleta campos del estado y valida tipos
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
