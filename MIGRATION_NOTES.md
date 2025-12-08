# Arquitetura Atualizada - PostgreSQL Nativo

## Alterações Realizadas

### 1. Dependências
- **Removido**: `@prisma/client`, `@prisma/adapter-pg`, `prisma`
- **Adicionado**: `pg`, `@types/pg`

### 2. Conexão com Banco de Dados
- Arquivo renomeado: `src/lib/prisma.ts` → `src/lib/database.ts`
- Substituído PrismaClient por Pool do pg
- Mantida configuração via `DATABASE_URL` do .env

### 3. Repository
- Arquivo renomeado: `AuthPrismaRepository.ts` → `AuthPgRepository.ts`
- Classe renomeada: `AuthPrismaRepository` → `AuthPgRepository`
- Implementadas queries SQL diretas:
  - `createUser`: INSERT com RETURNING
  - `findUserByEmail`: SELECT com WHERE

### 4. Tipos
- Criado: `src/types/UserDTO.ts` com estrutura do usuário
- Atualizada interface `IAuthRepository` para retornar `UserDTO`
- Atualizada interface `IAuthService` para retornar `UserDTO`

### 5. Próximos Passos
- O schema do Prisma ainda existe em `prisma/schema.prisma` como referência
- As migrations do Prisma podem ser mantidas ou você pode gerenciar o schema manualmente
- Considere criar um script SQL para inicializar o banco de dados se necessário
- O diretório `src/generated/prisma` pode ser removido

## Como Usar

```typescript
import { pool } from './lib/database';

// Executar query
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

// Fechar conexão (quando necessário)
await pool.end();
```

## Variáveis de Ambiente Necessárias

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PORT=3000
```
