export async function pdfUrl(element) {
  const { registerFonts } = await import('./fonts.js')
  registerFonts()
  const { pdf } = await import('@react-pdf/renderer')
  const blob = await pdf(element).toBlob()
  return URL.createObjectURL(blob)
}
