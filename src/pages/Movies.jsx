import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import PageHeading from '../components/PageHeading'
import { movies } from '../data/movies'
export default function Movies() { const [genre, setGenre] = useState('All'); const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror']; const items = movies.filter((movie) => movie.type === 'Movie' && (genre === 'All' || movie.genre.includes(genre))); return <div className="catalog-page"><PageHeading eyebrow="The collection" title="Movies" description="Big stories, small moments, and everything worth pressing play for." /><div className="filter-bar"><span>Browse by genre</span>{genres.map((item) => <button className={genre === item ? 'filter-button active' : 'filter-button'} key={item} onClick={() => setGenre(item)}>{item}</button>)}</div><div className="catalog-grid">{items.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div></div> }
