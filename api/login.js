import { ok, fail, readBody } from './_lib/http.js'
import { signAdminToken } from './_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed')

  const { username, password } = await readBody(req)
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return fail(res, 401, 'Invalid credentials')
  }

  const token = await signAdminToken()
  return ok(res, { token })
}
