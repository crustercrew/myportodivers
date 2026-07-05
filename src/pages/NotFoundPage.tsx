import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 border border-primary/30 bg-surface-container-low">
      <p className="text-primary font-bold tracking-widest text-sm">[ERROR 404: SECTOR NOT FOUND]</p>
      <Link to="/" className="text-xs text-primary underline underline-offset-2">
        Return to Command Center
      </Link>
    </div>
  )
}
