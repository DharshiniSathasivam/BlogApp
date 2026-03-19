import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('https://blogapp-backend-ojrf.onrender.com/api/auth/login', form)
      // Save to localStorage
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      localStorage.setItem('id', res.data.id)
      alert(`Welcome back ${res.data.username}!`)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>🔐 Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input id="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
      />
      <input id="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p style={{ textAlign: 'center', color: '#888' }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login