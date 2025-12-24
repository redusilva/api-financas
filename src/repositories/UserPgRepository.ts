import { pool } from "../lib/database";
import { IUserRepository } from "../interfaces/IUserRepository";
import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";
import { buildUser } from "../utils/builders/userBuilder";

export class UserPgRepository implements IUserRepository {
    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        const query = `
            INSERT INTO users (
                name, email, password, role_id, status_id,
                email_verified, email_verification_token, email_verification_expires_at,
                created_at, updated_at
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
        return buildUser(result.rows[0]);
    }

    async findUserByEmail(email: string): Promise<UserDTO | null> {
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(query, [email]);

        return result.rows.length > 0 ? buildUser(result.rows[0]) : null;
    }

    async updateUser(user: UserDTO): Promise<UserDTO> {
        const query = `
            UPDATE users
            SET 
                name = $1, 
                email = $2, 
                password = $3, 
                role_id = $4, 
                refresh_token_hash = $5, 
                status_id = $6, 
                email_verified = $7, 
                email_verification_token = $8,
                email_verification_expires_at = $9,
                updated_at = NOW()
            WHERE id = $10
            RETURNING *
        `;

        const values = [
            user.name,
            user.email,
            user.password,
            user.role_id,
            user.refresh_token_hash,
            user.status_id,
            user.email_verified,
            user.email_verification_token || null,
            user.email_verification_expires_at || null,
            user.id
        ];

        const result = await pool.query(query, values);
        return buildUser(result.rows[0]);
    }

    async findByid(id: number): Promise<UserDTO | null> {
        const query = `SELECT * FROM users WHERE id = $1`;
        const result = await pool.query(query, [id]);

        return result.rows.length > 0 ? buildUser(result.rows[0]) : null;
    }
}