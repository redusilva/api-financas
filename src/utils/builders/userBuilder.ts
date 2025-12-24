import { UserDTO } from "../../types/UserDTO";

export const buildUser = (row: any): UserDTO => {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password,
        role_id: row.role_id,
        status_id: row.status_id,
        email_verified: row.email_verified,
        refresh_token_hash: row.refresh_token_hash,
        email_verification_token: row.email_verification_token,
        email_verification_expires_at: row.email_verification_expires_at,
        created_at: row.created_at,
        updated_at: row.updated_at
    };
};