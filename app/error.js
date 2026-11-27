'use client';

export default function ErrorPage({ reset }) {
  return <main className="wrap"><h1 className="h1">Something went wrong.</h1><p className="sub">Please try again.</p><button className="btn ui" onClick={() => reset()}>Try again</button></main>;
}
