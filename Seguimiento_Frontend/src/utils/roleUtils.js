export const usuarioTienePermisos = (nombrePermiso, permisos) => {
    //debugger;
    const permiso = permisos.filter(item => item.name === nombrePermiso);
    return (permiso.length > 0);
}