import { getJSON, postJSON, sendJSON } from '../lib/api'

export function login(username, password) {
  return postJSON('/api/login', { username, password })
}

export const getGallery = (token) => getJSON('/api/admin/gallery', token)
export const addGalleryPhoto = (token, payload) => sendJSON('/api/admin/gallery', 'POST', payload, token)
export const updateGalleryPhoto = (token, id, payload) => sendJSON(`/api/admin/gallery/${id}`, 'PATCH', payload, token)
export const deleteGalleryPhoto = (token, id) => sendJSON(`/api/admin/gallery/${id}`, 'DELETE', {}, token)
export const getUploadUrl = (token, filename) => sendJSON('/api/admin/upload-url', 'POST', { filename }, token)
export const getRecords = (token) => getJSON('/api/admin/records', token)

export async function uploadToSignedUrl(signedUrl, file) {
  const res = await fetch(signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })
  if (!res.ok) throw new Error('Upload failed')
}
