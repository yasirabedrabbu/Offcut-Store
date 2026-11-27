import Link from 'next/link';

export default function NotFound() {
  return <main className="wrap"><h1 className="h1">Page not found.</h1><p className="sub">The page you requested does not exist.</p><Link className="btn ui" href="/">Return home</Link></main>;
}
