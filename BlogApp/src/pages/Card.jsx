import React, { useEffect, useState } from 'react'
import '../Styles/Card.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const GRADIENTS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
];

function getGradient(index) {
  return GRADIENTS[index % GRADIENTS.length];
}

function Card() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const currentUser=localStorage.getItem('username')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts')
        const data=response.data.posts || response.data
        const sorted=data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
        setPosts(sorted)
      } catch (err) {
        setError("Failed to load posts")
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
   
  const handleDelete = async (postId) => {
  if (!window.confirm('Are you sure you want to delete this post?')) return
  try {
    await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    setPosts(posts => posts.filter(p => p._id !== postId))  // ← removes from UI
  } catch (err) {
    alert('Failed to delete post')
  }
}

  if (loading) return <h2 className="center-text">Loading posts...</h2>
  if (error) return <h2 className="center-text error">{error}</h2>
  if (posts.length === 0)return<h2 className='center-text'>No Post yet.</h2>
    
  return (
    <>
  
    <div className="cards-grid">
      {posts.map((post, index) => {
         const isOwner =
          currentUser === post.author?.username ||
          currentUser === post.author


         console.log('currentUser:', currentUser)
         console.log('post.author:', post.author)
         
        return(

        <div key={post._id} className="post-card">
          <div
            className="card-cover"
            style={{
              background: post.image
                ? `url(${post.image}) center/cover`
                : getGradient(index)
            }}
          >
            {post.tags && (
  <div className="card-tags">
    {post.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 2).map(tag => (
      <span key={tag} className="card-tag">{tag}</span>
    ))}
  </div>
)}
          </div>
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>

            <p className="card-excerpt">
              {post.content?.substring(0, 100)}...
            </p>

            <div className="card-footer">

              <div className="card-meta">
                <div className="avatar">
                  {post.author?.username?.[0]?.toUpperCase() 
                  ||post.author?.[0]?.toUpperCase()
                  || 'A'
                  }
                </div>
                <div>
                  <div className="author-name">
                    {(post.author?.username || post.author||"Anonymous").charAt(0).toUpperCase()+
                    (post.author?.username || post.author||"Anonymous").slice(1)}
                  </div>
                  <div className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
                
                {isOwner && (
                    <>
                      <Link to={`/posts/edit/${post._id}`} className='action-btn edit' title='Edit'>✏️</Link>
                      <button onClick={() => handleDelete(post._id)} className='action-btn delete' title='Delete'>🗑️</button>
                    </>
                  )}
                  <Link to={`/posts/${post._id}`} className="read-btn">
                Read →
                 </Link>
              
            </div>
          </div>

        </div>
        )
      })}
    </div>
    </>
  )
}

export default Card