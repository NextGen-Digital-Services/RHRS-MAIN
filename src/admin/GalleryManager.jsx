import { useCallback, useEffect, useRef, useState } from 'react'
import { getGallery, addGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto, getUploadUrl, uploadToSignedUrl } from './api'

function PhotoEditor({ photo, onSave, onDelete, onMove, index, isFirst, isLast, busy }) {
  const [title, setTitle] = useState(photo.title)
  const [caption, setCaption] = useState(photo.caption || '')
  const [category, setCategory] = useState(photo.category)
  const [visible, setVisible] = useState(photo.is_visible)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const save = async () => {
    setSaving(true)
    setErr('')
    try {
      await onSave(photo, { title, caption, category, is_visible: visible })
    } catch (e) {
      setErr(e.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!confirm(`"${photo.title}" ko delete karein?`)) return
    setErr('')
    try {
      await onDelete(photo)
    } catch (e) {
      setErr(e.message)
    }
  }

  return (
    <div className="bg-white border border-border rounded-sm overflow-hidden hover:border-saffron/40 transition-colors">
      <div className="h-40 bg-saffron-bg relative group">
        <img src={photo.image_url} alt={title} className="w-full h-full object-cover" />
        <div className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider text-white ${visible ? 'bg-green-600' : 'bg-ink/60'}`}>
          {visible ? 'Visible' : 'Hidden'}
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button onClick={() => onMove(index, -1)} disabled={isFirst} className="w-8 h-8 bg-ink/70 text-white rounded-sm text-sm hover:bg-saffron transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" title="Move up">↑</button>
          <button onClick={() => onMove(index, 1)} disabled={isLast} className="w-8 h-8 bg-ink/70 text-white rounded-sm text-sm hover:bg-saffron transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" title="Move down">↓</button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block mb-1">Title</label>
          <input type="text" className="input-field !py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block mb-1">Caption</label>
          <input type="text" className="input-field !py-2" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. Varanasi | Jan 2026" />
        </div>
        <div className="flex items-center gap-3">
          <select className="input-field !py-2 flex-1" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="events">Events</option>
            <option value="issues">Issues & Alerts</option>
          </select>
          <label className="flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer">
            <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} className="accent-[#DE651A]" />
            Show
          </label>
        </div>
        {err && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2">⚠ {err}</p>}
        <div className="flex gap-2">
          <button onClick={save} disabled={saving || busy} className="flex-1 btn-saffron !py-2 !text-xs" style={{ background: 'linear-gradient(135deg,#DE651A,#C0550A)' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button onClick={remove} className="px-4 !py-2 border border-red-300 text-red-600 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GalleryManager({ token }) {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setPhotos(await getGallery(token))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  const uploadFiles = async (files) => {
    const fileList = Array.from(files)
    if (!fileList.length) return
    setUploading(true)
    setError('')
    let failed = 0
    for (const file of fileList) {
      try {
        const { signedUrl, publicUrl } = await getUploadUrl(token, file.name)
        await uploadToSignedUrl(signedUrl, file)
        await addGalleryPhoto(token, {
          title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
          caption: '',
          category: 'events',
          image_url: publicUrl,
        })
      } catch {
        failed++
      }
    }
    setUploading(false)
    if (failed) setError(`${failed} photo(s) upload me dikkat aayi.`)
    await load()
    if (fileRef.current) fileRef.current.value = ''
  }

  const savePhoto = async (photo, patch) => {
    await updateGalleryPhoto(token, photo.id, patch)
    setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, ...patch } : p)))
  }

  const removePhoto = async (photo) => {
    await deleteGalleryPhoto(token, photo.id)
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id))
  }

  const move = async (index, dir) => {
    const next = index + dir
    if (next < 0 || next >= photos.length) return
    const a = photos[index]
    const b = photos[next]
    const arr = [...photos]
    arr[index] = b
    arr[next] = a
    setPhotos(arr)
    const aOrder = a.sort_order ?? next
    const bOrder = b.sort_order ?? index
    try {
      await Promise.all([
        updateGalleryPhoto(token, a.id, { sort_order: bOrder }),
        updateGalleryPhoto(token, b.id, { sort_order: aOrder }),
      ])
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-sm p-8 mb-8 text-center transition-colors cursor-pointer ${
          dragging ? 'border-saffron bg-saffron-bg' : 'border-border bg-white hover:border-saffron/50'
        }`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); uploadFiles(e.dataTransfer.files) }}
      >
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => uploadFiles(e.target.files)} />
        <span className="text-4xl block mb-3 text-saffron">🖼</span>
        <p className="font-heading text-base font-bold text-ink">Photos upload karein</p>
        <p className="text-xs text-ink-muted mt-1">Drag & drop ya click karke multiple photos select karein (JPG/PNG/WebP)</p>
        <p className="text-[11px] text-saffron mt-2 font-semibold">{uploading ? 'Upload ho raha hai…' : 'Upload'}</p>
      </div>

      {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2 mb-6">⚠ {error}</p>}

      {loading && <p className="text-center text-sm text-ink-muted py-10">Loading…</p>}

      {!loading && photos.length === 0 && (
        <div className="text-center py-16 bg-white border border-border rounded-sm">
          <p className="font-heading text-base font-bold text-ink mb-1">Abhi koi photo nahi hai</p>
          <p className="text-xs text-ink-muted">Upar upload box se photos add karein.</p>
        </div>
      )}

      {!loading && photos.length > 0 && (
        <>
          <p className="text-xs text-ink-muted mb-4 uppercase tracking-wider">Total {photos.length} photos · ↑↓ se order change karein</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {photos.map((photo, i) => (
              <PhotoEditor
                key={photo.id}
                photo={photo}
                index={i}
                isFirst={i === 0}
                isLast={i === photos.length - 1}
                onSave={savePhoto}
                onDelete={removePhoto}
                onMove={move}
                busy={uploading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
