/** npm imports */
import { useState } from 'react'

/** local imports */
import { useComments } from '../../hooks/useComments'

interface CommentsSectionProps {
  characterId: number
}

const CommentsSection = ({ characterId }: CommentsSectionProps) => {
  const { comments, addComment, removeComment } = useComments(characterId.toString())

  const [newComment, setNewComment] = useState<string>('')

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addComment(newComment)
    setNewComment('')
  }

  return (
    <div>
      <ul className="mt-2 space-y-1">
        {comments.map((comment, i) => (
          <li key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span className="text-sm text-gray-800">{comment}</span>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs"
              onClick={() => removeComment(i)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <form className="mt-3 flex gap-2" onSubmit={handleCommentSubmit}>
        <input
          className="border p-1 rounded w-full"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded" type="submit">
          Add
        </button>
      </form>
    </div>
  )
}

export default CommentsSection
