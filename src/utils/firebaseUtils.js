// src/utils/firebaseUtils.js
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const uploadImage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, file.originalname);
  await uploadBytes(storageRef, file.buffer, { contentType: file.mimetype });
  const url = await getDownloadURL(storageRef);
  return url;
};

export const deleteImage = async (filename) => {
  const storage = getStorage();
  const storageRef = ref(storage, filename);
  await deleteObject(storageRef);
};
