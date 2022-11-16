export const createDocumentReturnWidth = (width, height) => {
  const doc = app.documents.add(
    DocumentColorSpace.CMYK,
    width,
    height
    );
  return doc.width;
}