export function isPublicPath(pathname: string) {
  return (
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/features') ||
    pathname.startsWith('/for-who') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/privacy-policy') ||
    pathname.startsWith('/terms') ||
    pathname.startsWith('/api/auth') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  )
}
