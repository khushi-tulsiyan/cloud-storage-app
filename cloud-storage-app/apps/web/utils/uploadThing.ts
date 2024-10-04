import { createUploadthing } from 'uploadthing';

export const uploadFiles = createUploadthing({
  endpoint: "/api/upload",
  apiKey: "your-uploadthing-api-key",
});
