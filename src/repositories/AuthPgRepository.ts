import { pool } from "../lib/database";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";

export class AuthPgRepository implements IAuthRepository {
    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        const query = `
            INSERT INTO users (
                name, 
                email, 
                password,
                role_id, 
                status_id,
                email_verified, 
                email_verification_token, 
                email_verification_expires_at,
                created_at, 
                updated_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
            RETURNING *
        `;

        const values = [
            data.name,
            data.email,
            data.password,
            data.role_id,
            data.status_id,
            false,
            data.email_verification_token || null,
            data.email_verification_expires_at || null
        ];

        const result = await pool.query(query, values);

        return {
            id: result.rows[0].id,
            name: data.name,
            email: result.rows[0].email,
            role_id: result.rows[0].role_id,
            status_id: result.rows[0].status_id,
            email_verified: result.rows[0].email_verified,
            created_at: result.rows[0].created_at,
            updated_at: result.rows[0].updated_at
        };
    }

    async findUserByEmail(email: string): Promise<UserDTO | null> {
        const query = `
            SELECT *
            FROM users
            WHERE email = $1
        `;

        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return null;
        }

        return {
            id: result.rows[0].id,
            name: result.rows[0].name,
            email: result.rows[0].email,
            password: result.rows[0].password,
            role_id: result.rows[0].role_id,
            status_id: result.rows[0].status_id,
            email_verified: result.rows[0].email_verified,
            refresh_token_hash: result.rows[0].refresh_token_hash,
            created_at: result.rows[0].created_at,
            updated_at: result.rows[0].created_at
        };
    }

    async updateUser(user: UserDTO): Promise<UserDTO> {
        const query = `
            UPDATE users
            SET name = $1, email = $2, password = $3, role_id = $4, refresh_token_hash = $5, status_id = $6, email_verified = $7, updated_at = NOW()
            WHERE id = $8
            RETURNING *
        `;

        const values = [
            user.name || '',
            user.email,
            user.password,
            user.role_id,
            user.refresh_token_hash,
            user.status_id,
            user.email_verified,
            user.id
        ];

        const result = await pool.query(query, values);

        return {
            id: result.rows[0].id,
            name: result.rows[0].name,
            email: result.rows[0].email,
            role_id: result.rows[0].role_id,
            status_id: result.rows[0].status_id,
            email_verified: result.rows[0].email_verified,
            refresh_token_hash: result.rows[0].refresh_token_hash,
            created_at: result.rows[0].created_at,
            updated_at: result.rows[0].updated_at
        };
    }
}