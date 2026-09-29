import { createContext, useContext, useState } from 'react'
const ListContext = createContext(null)
export function ListProvider({ children }) {
  const [list, setList] = useState(() => JSON.parse(localStorage.getItem('netflix-list') || '[]'))
  const update = (nextList) => { setList(nextList); localStorage.setItem('netflix-list', JSON.stringify(nextList)) }
  const isSaved = (id) => list.some((movie) => movie.id === id)
  const toggleList = (movie) => update(isSaved(movie.id) ? list.filter((item) => item.id !== movie.id) : [...list, movie])
  return <ListContext.Provider value={{ list, isSaved, toggleList }}>{children}</ListContext.Provider>
}
// The hook lives beside its provider so list persistence remains self-contained.
// eslint-disable-next-line react-refresh/only-export-components
export const useList = () => useContext(ListContext)