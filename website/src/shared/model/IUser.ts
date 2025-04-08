export interface IUser {
    id?: number;
    email: string;
    password: string;
    VKID?: string;
    username: string;
    createdAt?: Date;
    statusUser?: string;
}
