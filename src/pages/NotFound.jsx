import { Link } from 'react-router-dom'
import ToriiDivider from '../components/ToriiDivider.jsx'

export default function NotFound() {
  return (
    <div className="container-kizo py-24 md:py-32 text-center max-w-xl mx-auto">
      <p className="eyebrow mb-5">404</p>
      <h1 className="font-display text-5xl sm:text-6xl mb-6">This Shrine is unmarked.</h1>
      <p className="text-stone text-lg mb-10">
        There's nothing at this address. The page may have moved, or the link
        was mistyped.
      </p>
      <ToriiDivider />
      <Link to="/" className="btn-primary mt-6">Return home</Link>
    </div>
  )
}
