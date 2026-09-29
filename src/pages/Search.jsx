import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import PageHeading from '../components/PageHeading'
import SearchBar from '../components/SearchBar'
import { movies } from '../data/movies'
export default function Search() { const [query, setQuery] = useState(''); const [submitted, setSubmitted] = useState(''); const results = movies.filter((movie) => { const value = submitted.toLowerCase(); return movie.title.toLowerCase().includes(value) || movie.genre.some((genre) => genre.toLowerCase().includes(value)) }); return <div className="catalog-page search-page"><PageHeading eyebrow="Find your next favorite" title="Search" description="Search by title, genre, or a feeling." /><SearchBar value={query} onChange={setQuery} onSubmit={(event) => { event.preventDefault(); setSubmitted(query) }} />{submitted && <p className="results-label">Results for <strong>“{submitted}”</strong></p>}<div className="catalog-grid">{results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>{submitted && !results.length && <div className="empty-state"><h2>No results found</h2><p>Try a different title or browse one of the collections above.</p></div>}</div> }
