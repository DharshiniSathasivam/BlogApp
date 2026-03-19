import React, { useEffect, useState } from 'react'
import '../Styles/Form.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
 
const API = 'https://blogapp-backend-ojrf.onrender.com/api';
 
function PostForm() {
 
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
 
  
  const [form, setForm] = useState({
    title: '',
    image: '',
    content: '',
    category: '',
    tags: '',
    author: localStorage.getItem('username') || '',
    updatedAt: ''
  })
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
 
  useEffect(() => {
    if (isEdit) {
      fetchPost()
    }
  }, [id])
 
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${API}/posts/${id}`)
      const post = res.data
      console.log('Post data:', post)
      console.log('Post ID:', id)
      setForm({
        title: post.title || '',
        content: post.content || '',
        category: post.category || '',
        author: post.author?.username || post.author || '',
        image: post.image || '',
        tags: Array.isArray(post.tags) ? post.tags.join(',') : post.tags || '',
        updatedAt: post.updatedAt || '',
      })
      
      if (post.image) setImagePreview(post.image)
    } catch (err) {
      alert("Failed to load Post")
    }
  }
 
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 1 * 1024 * 1024) {
      alert('Image too large! Please use an image under 1MB.')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(f => ({ ...f, image: reader.result }))
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }
    
  const handleUrlChange = (e) => {
    const url = e.target.value
    setForm(f => ({ ...f, image: url }))
    setImagePreview(url)
  }
  

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
 
  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) return
    setLoading(true)
 
    const payload = {
      ...form,
      tags: form.tags,
      author: form.author || localStorage.getItem('username') || 'Anonymous'
    }
 
    console.log('Sending payload:', payload)
    console.log('Token:', localStorage.getItem('token'))
 
    try {
      if (isEdit) {
        await axios.put(`${API}/posts/${id}`, payload, authHeader())
      } else {
        await axios.post(`${API}/posts`, payload, authHeader())
      }
      navigate('/')
    } catch (err) {
      console.log('Error:', err.response?.status, err.response?.data)
      alert("Save failed: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className="form-container">
      <h2>{isEdit ? "✏️ Edit Post" : "✍️ New Post"}</h2>
 
      <input
        id="title"
        name="title"
        placeholder='Title'
        value={form.title}
        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
      />
 
      
      <div className="image-upload-wrapper">
        <label htmlFor="image-upload" className="image-upload-label">
          📷 {imagePreview ? 'Change Image' : 'Upload Image'}
        </label>
        <input
          id="image-upload"
          name="image-upload"
          type="file"
          accept='image/*'
          placeholder="Or paste image URL here"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <input
          id="image-url"
          name="image-url"
          type="text"
          placeholder="Or paste image URL here"
          value={form.image.startsWith('data:') ? '' : form.image}
          onChange={handleUrlChange}
        />
        {imagePreview && (
          <div className="image-preview-wrapper">
            <img src={imagePreview} alt="Preview" className="image-preview" />
            <button
              className="remove-image-btn"
              onClick={() => {
                setImagePreview('')
                setForm(f => ({ ...f, image: '' }))
              }}
            >✕ Remove</button>
          </div>
        )}
      </div>
 
      <textarea
        id="content"
        name="content"
        placeholder='Content'
        rows={10}
        value={form.content}
        onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
      />
      <input
        id="category"
        name="category"
        placeholder='Category'
        value={form.category}
        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
      />
      <input
        id="tags"
        name="tags"
        placeholder='Tags'
        value={form.tags}
        onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
      />
      <input
        id="author"
        name="author"
        placeholder='Author Name'
        value={form.author}
        onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
      />
 
      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update" : "Create"}
      </button>
    </div>
  )
}
 
export default PostForm