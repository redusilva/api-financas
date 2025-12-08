import { Pool, PoolClient } from "pg";
import { ITransactionManager } from "../interfaces/ITransactionManager";

export class PgTransactionManager implements ITransactionManager {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL
        });
    }

    async beginTransaction(): Promise<PoolClient> {
        const client = await this.pool.connect();
        await client.query("BEGIN");
        return client;
    }

    async commit(client: PoolClient): Promise<void> {
        try {
            await client.query("COMMIT");
        } finally {
            client.release();
        }
    }

    async rollback(client: PoolClient): Promise<void> {
        try {
            await client.query("ROLLBACK");
        } finally {
            client.release();
        }
    }
}
