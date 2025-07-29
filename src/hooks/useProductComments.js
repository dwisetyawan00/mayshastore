import { useState } from 'react'

export default function useProductComments(productId) {
  const key = `comments_${productId}`
  const [comments, setComments] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) || "[]")
    }
    return []
  })

  const addComment = (comment) => {
    const newComment = {
      id: Date.now(),
      ...comment
    }
    const next = [...comments, newComment]
    setComments(next)
    localStorage.setItem(key, JSON.stringify(next))
  }

  const deleteComment = (id) => {
    const next = comments.filter(c => c.id !== id)
    setComments(next)
    localStorage.setItem(key, JSON.stringify(next))
  }

  return { comments, addComment, deleteComment }
}
