import axios from 'axios'
import '../Styles/Article.css'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ArticlesPage() {
      const {id}=useParams()
      const Navigate=useNavigate()
      const[post,setPost]=useState(null)
      const[loading,setLoading]=useState(true)
      const[error,setError]=useState('')
       
      useEffect(()=>{
        const fetchPost =async()=>{
          try{
            const res =await axios.get(`https://blogapp-backend-ojrf.onrender.com/api/posts/${id}`)
            setPost(res.data)
          }
          catch(err){
            setError('Failed to lead Post')
          }
          finally{
            setLoading(false)
          }
        }
        fetchPost()
      },[id])
        
       if (loading) return <h2 className="center-text">Loading...</h2>
       if (error)   return <h2 className="center-text error">{error}</h2>
       if (!post)   return <h2 className="center-text">Post not found</h2>


  return (
    <div className="post-detail">
       <div className="detail-cover"
       style={{background:post.image 
        ? `url(${post.image})center/ cover`
        :'linear-gradient(360deg,black,blue)'
       }}/>
       <div className='detail-body'>
        {post.tags && (
          <div className='card-tags'>
            {post.tags.split(',').map(t=>t.trim()).filter(Boolean).map(tag=>(
              <span key={tag} className='card-tag'>{tag}</span>
            ))}
            </div>
        )}
         <h1 className="detail-title">{post.title}</h1>
        <div className='detail-meta'>
          <div className='avatar'>
            {post.author?.username?.[0]?.toUpperCase() || post.author?.[0]?.toUpperCase() || 'A'}
          </div>
           <div>
            <div className='author-name'>{post.author?.username || post.author ||'Anonymous'}</div>
            <div className='post-date'>{new Date(post.createdAt).toLocaleDateString()}</div>
           </div>
           <span className='detail-category'>{post.category}</span>
        </div>

        <div className='detail-content'>
          {post.content}
        </div>

        <button className='back-btn' onClick={()=>Navigate(-1)}>
          ← Back to Posts
        </button>
       </div>
    </div>
  )
}

export default ArticlesPage
