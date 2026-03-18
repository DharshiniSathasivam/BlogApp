import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/auth/register', form)
      alert('Account created! Please login.')
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>📝 Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input id="username"
        placeholder="Username"
        value={form.username}
        onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
      />
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
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </button>
      <p style={{ textAlign: 'center', color: '#888' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register