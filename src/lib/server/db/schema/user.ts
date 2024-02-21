import { sqliteTable, text} from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
    username: text("user_name").notNull().unique(),
    hashed_password: text("hashed_password").notNull(),
});



