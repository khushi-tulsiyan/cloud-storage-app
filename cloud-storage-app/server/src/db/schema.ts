import {drizzle}  from 'drizzle-orm/libsql';
import { primaryKey } from 'drizzle-orm/mysql-core';
import { Database } from 'sqlite3';

const db = new Database('C:\Users\INDIA\cloud-storage-app\cloud-storage-app\server\src\db\db.sqlite');

export const User = db.define ('users', {
    id: {type:'uuid', primaryKey: true},
    email: {type: 'string'},
    passkey_id: { type: 'string'},
    createdAt: {type: 'datetime', default: () => 'CURRENT_TIMESTAMP'},

});

export default db;

