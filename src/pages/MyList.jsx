import MovieCard from '../components/MovieCard'
import PageHeading from '../components/PageHeading'
import { useList } from '../context/ListContext'
export default function MyList() { const { list } = useList(); return <div className="catalog-page"><PageHeading eyebrow="Your private shelf" title="My List" description="Keep the stories you want to come back to close at hand." />{list.length ? <div className="catalog-grid">{list.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div> : <div className="empty-state"><h2>Your list is waiting</h2><p>Save movies and shows as you browse, and they’ll appear here.</p></div>}</div> }
