export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    role_id: number;
    status_id: number;
    email_verification_token?: string;
    email_verification_expires_at?: Date;
};
