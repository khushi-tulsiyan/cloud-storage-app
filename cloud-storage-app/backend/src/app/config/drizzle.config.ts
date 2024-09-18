
import { defineConfig } from 'drizzle-kit';


export default defineConfig({
  "schema": "./src/schema/*.ts", // Adjust the path to your schema files
  "out": "./migrations",
  "db": {
    "client": "pg",
    "connection": {
      "host": "localhost",
      "port": 5432,
      "user": "cloud_user",
      "password": "your_password",
      "database": "cloud_storage"
    }
  }
}
);
