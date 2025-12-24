export type UserDTO = {
    id: number;
    name: string;
    email: string;
    password?: string;
    refresh_token_hash?: string;
    role_id: number;
    status_id: number;
    email_verified: boolean;
    email_verification_expires_at?: Date | null;
    email_verification_token?: string | null;
    created_at: Date;
    updated_at: Date;
};
