import { ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
export default function MovieRow({ title, items }) { if (!items.length) return null; return <section className="content-row"><div className="row-heading"><h2>{title}</h2><span>Explore all <ChevronRight size={15} /></span></div><div className="row-scroller">{items.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div></section> }
