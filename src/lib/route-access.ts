export function isPublicPath(pathname: string) {
  return (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  )
}
