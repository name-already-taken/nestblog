
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    userName: string;
    password: string;
    email?: Nullable<string>;
}

export interface UpdateUserInput {
    id: number;
}

export interface User {
    uuid: string;
    userName: string;
    password: string;
    salt: string;
    email?: Nullable<string>;
    createDate: string;
    lastUpdate: string;
}

export interface IQuery {
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(uuid: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(uuid: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
