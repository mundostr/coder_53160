/**
 * Definimos un esquema para Mongoose, al estilo Nest, con el uso de decoradores
 * y un SchemaFactory.
 * 
 * Si definimos al documento de tipo HydratedDocument, será devuelto con formato
 * de objeto de Mongoose; si lo hacemos con Document, será un objeto standard Javascript.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { Role } from '../entities/user.entity';

// export type UsersDocument = HydratedDocument<User>;
export type UsersDocument = Document<User>; // Equivalente a lean()

@Schema({ collection: 'users_nest' })
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;
    
    @Prop()
    age?: number;
    
    @Prop()
    gender?: string;
    
    @Prop({ required: true })
    password: string;
    
    @Prop()
    cart?: string;
    
    @Prop({ default: Role.user })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
