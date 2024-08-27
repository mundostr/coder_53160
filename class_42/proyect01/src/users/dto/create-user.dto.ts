// export class CreateUserDto {}

/**
 * Ejemplo de DTO con módulos externos de validación (class-validator y class-transformer)
 * Podríamos también utilizar nuestra validación manual.
 * 
 * Ver agregado en main.ts para activar el uso automático de DTOs.
 */

import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty({ message: 'first_name es obligatorio' })
    first_name: string;

    @Length(2, 64, { message: 'last_name debe tener entre 2 y 64 caracteres'})
    @IsNotEmpty({ message: 'last_name es obligatorio' })
    @Transform(param => param.value.toUpperCase())
    last_name: string;

    @IsEmail({}, { message: 'email no tiene formato válido' })
    @IsNotEmpty({ message: 'email es obligatorio' })
    email: string;
    
    @Length(2, 8, { message: 'password debe tener entre 2 y 8 caracteres'})
    @IsNotEmpty({ message: 'password es obligatorio' })
    password: string;
}
