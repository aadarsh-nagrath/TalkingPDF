import {integer, pgTable,pgEnum, serial , text, timestamp, varchar} from 'drizzle-orm/pg-core'


export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user']);
// we need to create a chat history table - to hold chats 
export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: varchar('user_id', {length:256}).notNull(),
    fileKey: text('file_key').notNull(), // this file key is to retrieve file from S3 -> to id the file within S3
});

// making messages schema - to store messages within chats
export const messages = pgTable('messages', {
    id: serial("id").primaryKey(),
    chatId: integer('chat_id').references(()=>chats.id).notNull(), // thats how to reference keys
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    //we need to set enum - user or system | system means message is sent by chatGPT, otherwise by a user
    role: userSystemEnum('role').notNull(),
});

//drizzle-orm -> to build schemas
//drizzle-kit -> providesutility functions to provide migrations and makes sure all database is synced up with schemas here