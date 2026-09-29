import { Search } from 'lucide-react'
export default function SearchBar({ value, onChange, onSubmit }) { return <form className="search-bar" onSubmit={onSubmit}><Search /><input aria-label="Search titles and genres" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search titles, genres, or moods" /><button type="submit">Search</button></form> }
