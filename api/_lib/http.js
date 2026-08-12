export function ok(res, data) {
  res.status(200).json(data)
}

export function fail(res, status, message) {
  res.status(status).json({ error: message })
}

export function readBody(req) {
  if (req.body !== undefined && req.body !== null) {
    return Promise.resolve(
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body,
    )
  }
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}
