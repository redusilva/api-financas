import { pool } from "../lib/database";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";

export class AuthPgRepository implements IAuthRepository {
    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        const query = `
            INSERT INTO users (email, password, role_id, status_id, email_verified)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, password, role_id, status_id, email_verified, created_at
        `;

        const values = [data.email, data.password, data.role_id, data.status_id, false];

        const result = await pool.query(query, values);

        return {
            id: result.rows[0].id,
            name: data.name,
            email: result.rows[0].email,
            role_id: result.rows[0].role_id,
            status_id: result.rows[0].status_id,
            email_verified: result.rows[0].email_verified,
            created_at: result.rows[0].created_at
        };
    }

    async findUserByEmail(email: string): Promise<UserDTO | null> {
        const query = `
            SELECT id, email, password, role_id, status_id, email_verified, created_at
            FROM users
            WHERE email = $1
        `;

        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return null;
        }

        return {
            id: result.rows[0].id,
            name: '',
            email: result.rows[0].email,
            role_id: result.rows[0].role_id,
            status_id: result.rows[0].status_id,
            email_verified: result.rows[0].email_verified,
            created_at: result.rows[0].created_at
        };
    }
}