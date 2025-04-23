// src/utils/imageUtils.js
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    // Fallback base64 placeholder image (1x1 transparent pixel)
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
  }
  const baseUrl = 'http://localhost:3000'; // Update to your production URL if needed
  // Normalize path to ensure it starts with /Uploads/
  const normalizedPath = imagePath.startsWith('/Uploads/') ? imagePath : `/Uploads/${imagePath}`;
  return `${baseUrl}${normalizedPath}`;
};