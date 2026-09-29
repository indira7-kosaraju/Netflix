import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import PageHeading from '../components/PageHeading'
import { movies } from '../data/movies'
export default function TVShows() { const [genre, setGenre] = useState('All'); const genres = ['All', 'Drama', 'Comedy', 'Sci-Fi', 'Adventure']; const items = movies.filter((movie) => movie.type === 'TV Show' && (genre === 'All' || movie.genre.includes(genre))); return <div className="catalog-page"><PageHeading eyebrow="Series worth staying up for" title="TV Shows" description="New worlds, familiar faces, and episodes that make one more impossible to resist." /><div className="filter-bar"><span>Browse by genre</span>{genres.map((item) => <button className={genre === item ? 'filter-button active' : 'filter-button'} key={item} onClick={() => setGenre(item)}>{item}</button>)}</div><div className="catalog-grid">{items.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div></div> }
