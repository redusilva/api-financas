export interface ITransactionManager {
    beginTransaction(): Promise<any>;
    commit(client: any): Promise<void>;
    rollback(client: any): Promise<void>;
}