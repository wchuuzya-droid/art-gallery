import { Link } from "react-router-dom";
import { ArrowRight, Star, Eye, TrendingUp, Loader2 } from "lucide-react";
import { useFeaturedArtworks, useArtworkStats } from "../hooks/useArtworks";

function Home() {
  const { artworks: featuredArt, loading: featuredLoading } =
    useFeaturedArtworks();
  const { count: artworkCount, loading: statsLoading } = useArtworkStats();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-100 via-purple-50 to-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-purple-900 leading-tight mb-6">
              Where Art Meets{" "}
              <span className="text-purple-500">Vision</span>
            </h1>
            <p className="text-lg text-purple-600 mb-8 max-w-lg">
              Discover breathtaking artworks from world-class artists. Browse
              our curated exhibits and find the piece that speaks to your soul.
            </p>
            <div className="flex gap-4">
              <Link
                to="/exhibit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium no-underline hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
              >
                Explore Exhibits
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#featured"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-xl font-medium no-underline hover:bg-purple-100 transition-colors"
              >
                View Featured
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-200/60">
              <img
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=700&h=500&fit=crop"
                alt="Art gallery"
                className="w-full h-80 lg:h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-purple-100">
              <p className="text-sm text-purple-400 font-medium">Collection</p>
              <p className="text-2xl font-bold text-purple-700">
                {statsLoading ? "..." : `${artworkCount} Works`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Star,
              label: "Featured Artists",
              value: "120+",
            },
            {
              icon: Eye,
              label: "Monthly Visitors",
              value: "45K",
            },
            {
              icon: TrendingUp,
              label: "Artworks Listed",
              value: statsLoading ? "..." : artworkCount.toString(),
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-purple-50 border border-purple-100"
              >
                <Icon className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-purple-800">
                  {stat.value}
                </p>
                <p className="text-sm text-purple-400 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-3">
              Featured Artworks
            </h2>
            <p className="text-purple-400 max-w-md mx-auto">
              Hand-picked pieces from our most celebrated artists
            </p>
          </div>

          {featuredLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArt.map((art) => (
                <div
                  key={art.id}
                  className="group rounded-2xl overflow-hidden bg-white border border-purple-100 shadow-sm hover:shadow-lg hover:shadow-purple-100 transition-all"
                >
                  <div className="overflow-hidden">
                    {art.image_url ? (
                      <img
                        src={art.image_url}
                        alt={art.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-64 bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-300">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-purple-800">
                      {art.title}
                    </h3>
                    <p className="text-sm text-purple-400 mt-1">{art.artist}</p>
                    <span className="inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                      {art.medium ?? art.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/exhibit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium no-underline hover:bg-purple-700 transition-colors"
            >
              View All Exhibits
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Showcase Your Art?
          </h2>
          <p className="text-purple-200 mb-8 text-lg">
            Join our community of artists and reach thousands of art enthusiasts
            around the world.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-xl font-semibold no-underline hover:bg-purple-50 transition-colors shadow-lg"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
