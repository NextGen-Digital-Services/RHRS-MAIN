import { jwtVerify, SignJWT } from 'jose'

function secret() {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me')
}

export async function signAdminToken() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(secret())
}

export async function verifyAdminToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export async function requireAdmin(req, res) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token || !(await verifyAdminToken(token))) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}
