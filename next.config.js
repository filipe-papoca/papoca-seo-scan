/** @type {import('next').NextConfig} */
const nextConfig = {
  // Homologação do site novo (public/homologacao, gerado por partes/montar_homologacao.py
  // no repositório do design system). /homologacao/<slug> abre <slug>/index.html.
  async rewrites() {
    return [
      { source: '/homologacao', destination: '/homologacao/index.html' },
      { source: '/homologacao/:pagina', destination: '/homologacao/:pagina/index.html' },
    ];
  },
  // ambiente de validação: não indexar
  async headers() {
    return [
      { source: '/homologacao', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/homologacao/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
};

module.exports = nextConfig;
