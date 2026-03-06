function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-uape-bg px-4 text-center text-uape-white">
      <p className="text-sm text-uape-muted">404</p>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <a href="/" className="uape-orange-btn rounded-xl px-5 py-2.5 text-sm font-semibold">
        Go to landing
      </a>
    </main>
  )
}

export default NotFoundPage
