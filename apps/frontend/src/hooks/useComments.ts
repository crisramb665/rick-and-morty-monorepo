/** npm imports */
import { useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'characterComments'

type CommentsMap = Record<string, string[]>

// Comments stored on Local storage to avoid data persistance on db
export const useComments = (characterId: string) => {
  const [comments, setComments] = useState<string[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      const parsed: CommentsMap = JSON.parse(stored)
      setComments(parsed[characterId] || [])
    }

    setLoaded(true)
  }, [characterId])

  useEffect(() => {
    if (loaded) {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      const parsed: CommentsMap = stored ? JSON.parse(stored) : {}
      parsed[characterId] = comments
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed))
    }
  }, [comments, characterId, loaded])

  const addComment = (text: string) => {
    if (!text.trim()) return
    setComments((prev) => [...prev, text])
  }

  const removeComment = (index: number) => setComments((prev) => prev.filter((_, i) => i !== index))

  return { comments, addComment, removeComment }
}
