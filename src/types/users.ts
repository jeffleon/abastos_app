export interface UsersI {
    nombre: string
    usuario: string
    contrasena: string
    token: string
}

export interface LoginI {
    usuario: string
    contrasena: string
}

export interface DecodedI {
    
    usuario: string
    nombre: string
    
}