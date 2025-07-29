'use client'
import { useSession, signIn } from "next-auth/react"
import { useState } from "react"

export default function CommentSection({
  productId,
  comments,
  onAddComment,
  onDeleteComment,
  isAdmin
}) {
  const { data: session } = useSession()
  const [value, setValue] = useState('')
  const [rating, setRating] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onAddComment({
      text: value,
      rating,
      productId,
      userName: session?.user?.name,
      userImage: session?.user?.image,
      userEmail: session?.user?.email,
    })
    setValue('')
    setRating(0)
  }

  return (
    <div className="w-full mt-2">
      {!session ? (
        <button
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          onClick={() => signIn('google')}
        >
          Login dengan Google untuk komentar
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
          <div className="flex space-x-1 items-center">
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setRating(n)}>
                <svg
                  className={`w-5 h-5 ${rating >= n ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            <span className="text-xs text-gray-500 ml-2">{rating ? `${rating}/5` : ''}</span>
          </div>
          <textarea
            className="rounded-lg border border-gray-300 p-2 resize-none"
            placeholder="Tulis komentar..."
            value={value}
            onChange={e => setValue(e.target.value)}
            rows={2}
            required
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-semibold" type="submit">
            Kirim
          </button>
        </form>
      )}
      <div className="space-y-4">
        {comments?.length === 0 && <p className="text-sm text-gray-500">Belum ada komentar.</p>}
        {comments?.map((c, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
            <img
              src={c.userImage || "/default-user.png"}
              className="w-8 h-8 rounded-full object-cover"
              alt={c.userName || "user"}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800 text-sm">{c.userName}</span>
                <span className="flex space-x-1">
                  {c.rating
                    ? Array.from({length: c.rating}).map((_,i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))
                    : null}
                </span>
                {isAdmin && (
                  <button className="text-xs text-red-500 hover:underline"
                    onClick={() => onDeleteComment(c.id)}>
                    Hapus
                  </button>
                )}
              </div>
              <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
