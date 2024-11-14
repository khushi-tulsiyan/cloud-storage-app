import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../auth";

const storage = getStorage(app);

export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};
 