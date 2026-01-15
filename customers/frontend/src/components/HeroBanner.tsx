import Link from 'next/link';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export function HeroBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
}: HeroBannerProps) {
  return (
    <section
      className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }
          : undefined
      }
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 text-primary-100">{subtitle}</p>
        <Link
          href={ctaLink}
          className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
