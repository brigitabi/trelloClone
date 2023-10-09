import { ID, storage } from '@/appwrite';

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile('652011b001e5be85b754', ID.unique(), file);

  return fileUploaded;
};

export default uploadImage;
