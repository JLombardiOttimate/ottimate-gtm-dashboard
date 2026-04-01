import { useState } from 'react'

// Change this password to whatever you want.
// This is client-side only — it keeps casual visitors out,
// but is not cryptographic security. Fine for internal review.
const DASHBOARD_PASSWORD = 'ottimate2026'

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem('gtm_auth') === 'true' } catch { return false }
  })
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === DASHBOARD_PASSWORD) {
      setAuthed(true)
      try { sessionStorage.setItem('gtm_auth', 'true') } catch {}
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (authed) return children

  return (
    <div style={{
      background: '#0f172a', minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1e293b', borderRadius: 16, padding: '48px 40px',
        border: '1px solid #334155', width: 400, textAlign: 'center',
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>
          Ottimate GTM Intelligence
        </div>
        <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 32 }}>
          Enter the password to view the dashboard
        </div>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%', padding: '12px 16px', fontSize: 16,
            background: '#0f172a', border: `1px solid ${error ? '#ef4444' : '#334155'}`,
            borderRadius: 10, color: '#f8fafc', outline: 'none',
            transition: 'border-color 0.2s',
          }}
        />
        {error && (
          <div style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>
            Incorrect password
          </div>
        )}
        <button type="submit" style={{
          width: '100%', padding: '12px 0', fontSize: 15, fontWeight: 600,
          background: '#6366f1', color: '#fff', border: 'none',
          borderRadius: 10, cursor: 'pointer', marginTop: 16,
          transition: 'background 0.2s',
        }}>
          View Dashboard
        </button>
      </form>
    </div>
  )
}
