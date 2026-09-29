import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import { movies } from '../data/movies'
export default function Home() { const featured = movies[0]; const rows = ['Trending', 'Popular', 'Top Rated', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Recently Added']; return <><Hero movie={featured} /><div className="home-content">{rows.map((row) => <MovieRow key={row} title={row === 'Popular' ? 'Popular on Netflix' : row === 'Top Rated' ? 'Top Rated' : row} items={movies.filter((movie) => movie.category === row).slice(0, 10)} />)}</div></> }
