import { ok, fail } from '../../_lib/http.js'
import { requireAdmin } from '../../_lib/auth.js'
import { supabase } from '../../_lib/supabase.js'

export default async function handler(req, res) {
  if (!(await requireAdmin(req, res))) return

  const { id } = req.query
  if (!id) return fail(res, 400, 'id is required')

  if (req.method === 'PATCH') {
    const body = await new Promise((resolve, reject) => {
      let raw = ''
      req.on('data', (chunk) => { raw += chunk })
      req.on('end', () => {
        try {
          resolve(raw ? JSON.parse(raw) : {})
        } catch {
          reject(new Error('Invalid JSON'))
        }
      })
      req.on('error', reject)
    })

    const patch = {}
    if (body.title !== undefined) patch.title = body.title
    if (body.caption !== undefined) patch.caption = body.caption
    if (body.category !== undefined) patch.category = body.category
    if (body.sort_order !== undefined) patch.sort_order = body.sort_order
    if (body.is_visible !== undefined) patch.is_visible = body.is_visible
    if (Object.keys(patch).length === 0) return fail(res, 400, 'Nothing to update')

    const { data, error } = await supabase
      .from('gallery_photos')
      .update(patch)
      .eq('id', id)
      .select('*')
      .single()

    if (error) return fail(res, 500, error.message)
    return ok(res, data)
  }

  if (req.method === 'DELETE') {
    const { data: photo } = await supabase
      .from('gallery_photos')
      .select('*')
      .eq('id', id)
      .single()

    if (photo?.image_url) {
      const path = photo.image_url.split(`/object/public/gallery/`)[1]
      if (path) {
        await supabase.storage.from('gallery').remove([decodeURIComponent(path)])
      }
    }

    const { error } = await supabase.from('gallery_photos').delete().eq('id', id)
    if (error) return fail(res, 500, error.message)
    return ok(res, { success: true })
  }

  return fail(res, 405, 'Method not allowed')
}
