import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Correio Elegante · Festa Junina da Papoca 🎪',
  description: 'Envie um correio elegante para seus colegas com superpoderes juninos da Papoca!',
};

export default function CorreioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
