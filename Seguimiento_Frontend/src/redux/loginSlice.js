import { createSlice } from "@reduxjs/toolkit"

const initialData = {
    token: localStorage.getItem('token'),
    permisos_storage: localStorage.getItem('permiso'),
    permisos: []
}
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialData,
    reducers: {
        sesionIniciada: (state, action) => {
            const token = action.payload;
            state.token = token
            localStorage.setItem('token', token);
        },
        guardarPermisos: (state, action) => {
            const permisos = action.payload;
            state.permisos = permisos;
            //localStorage.setItem('permiso', permisos);
            localStorage.setItem('permiso', JSON.stringify(permisos));
        },
        sesionCerrada: (state) => {
            state.token = null
            localStorage.removeItem('token');
            localStorage.removeItem('permiso');
            //localStorage.removeItem('permiso');
        }
    }
});
export const { sesionIniciada, sesionCerrada, guardarPermisos } = loginSlice.actions;

export default loginSlice.reducer;