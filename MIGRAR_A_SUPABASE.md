# Migrar de SQLite a PostgreSQL / Supabase

Guía breve para cambiar la base de datos local (SQLite) a PostgreSQL usando Supabase.
El proyecto ya usa Prisma 7, por lo que el cambio es mínimo.

---

## 1. Obtener la URL de Supabase

En el dashboard de Supabase: **Project Settings → Database → Connection string → URI**.
Rellena la contraseña real (no uses el placeholder `[YOUR-PASSWORD]`).

```bash
# Ejemplo
DATABASE_URL="postgresql://postgres:<tu-contraseña>@db.XXXX.supabase.co:5432/postgres"
```

> **Importante:** si Supabase usa conexión con pooler (Supavisor), usa la URL del
> pooler **transaccional** (puerto 6543) si la app corre en Node, o la directa (5432)
> según tu despliegue.

---

## 2. Editar `.env`

```env
# Antes (SQLite)
DATABASE_URL="file:./prisma/ridec.db"

# Después (Supabase/PostgreSQL)
DATABASE_URL="postgresql://postgres:TU-CONTRASEÑA@db.XXXX.supabase.co:5432/postgres"
```

---

## 3. Cambiar el provider en `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"   // era "sqlite"
}
```

---

## 4. Actualizar el driver adapter en el código

Cambiar el adapter de `better-sqlite3` → `pg` en **dos archivos**:

- `src/lib/prisma.ts`
- `prisma/seed.ts`

```ts
// Antes (SQLite)
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/ridec.db",
});

// Después (PostgreSQL)
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
```

> Si Supabase usa certificados y obtienes el error `P1010`, añade:
> `ssl: { rejectUnauthorized: false }` (solo para desarrollo).

---

## 5. Instalar/desinstalar adapters

```bash
npm install @prisma/adapter-pg
npm uninstall @prisma/adapter-better-sqlite3
```

---

## 6. Regenerar las migraciones (ROMPEDOR)

⚠️ **Las migraciones actuales son de SQLite** (`migration_lock.toml` dice `sqlite`)
y NO son compatibles con PostgreSQL. Hay que regenerarlas.

> Ejecuta esto **solo contra una DB de desarrollo/vacía** en Supabase, nunca contra
> datos de producción sin respaldo.

```bash
# 1. Elimina el folder de migraciones existente
rm -rf prisma/migrations

# 2. Regenera una migración inicial desde cero (crea la BD y las tablas)
npx prisma migrate dev --name init

# 3. Genera el cliente Prisma con los tipos de PostgreSQL
npx prisma generate
```

---

## 7. Verificar funcionamiento

```bash
npm run db:seed     # puebla la DB (debe conectar a Supabase)
npm run lint
npx next build
```

---

## Notas

- `prisma.config.ts` **no cambia**: ya usa `env("DATABASE_URL")`, funciona con ambos motores.
- La config del seed ya vive en `prisma.config.ts` (ya no en `package.json`).
- En Prisma 7 el seed no corre automáticamente tras `migrate dev`; usa `npx prisma db seed`.
- `better-sqlite3` es solo local/Node; `pg` permite conectar a producción/hosting.
