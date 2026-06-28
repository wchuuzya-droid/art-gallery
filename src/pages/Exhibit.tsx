import { useState } from "react";
import { Search, Filter } from "lucide-react";

const categories = ["All", "Paintings", "Digital", "Sculpture", "Photography", "Mixed Media"];

const artworks = [
  { id: 1, title: "Violet Horizon", artist: "Maya Chen", category: "Paintings", price: "$2,400", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop" },
  { id: 2, title: "Ethereal Dreams", artist: "Lucas Rivera", category: "Digital", price: "$1,800", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&h=500&fit=crop" },
  { id: 3, title: "Abstract Flow", artist: "Aisha Patel", category: "Paintings", price: "$3,200", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&h=500&fit=crop" },
  { id: 4, title: "Neon Pulse", artist: "David Kim", category: "Digital", price: "$950", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=500&fit=crop" },
  { id: 5, title: "Golden Hour", artist: "Sofia Laurent", category: "Photography", price: "$1,200", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop" },
  { id: 6, title: "Marble Whisper", artist: "Takeshi Mori", category: "Sculpture", price: "$5,500", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=500&h=500&fit=crop" },
  { id: 7, title: "Prism Light", artist: "Elena Voss", category: "Mixed Media", price: "$2,100", image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&h=500&fit=crop" },
  { id: 8, title: "Coastal Serenity", artist: "James Okafor", category: "Paintings", price: "$1,650", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop" },
  { id: 9, title: "Binary Bloom", artist: "Mia Zhang", category: "Digital", price: "$780", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&h=500&fit=crop" },
];

function Exhibit() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = artworks.filter((art) => {
    const matchesCategory = activeCategory === "All" || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-3">
            Art Exhibit
          </h1>
          <p className="text-purple-400 max-w-lg mx-auto">
            Browse our curated collection of artworks across various mediums and
            styles.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-purple-400" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border-0 ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white"
                    : "bg-white text-purple-500 border border-purple-200 hover:bg-purple-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
            <input
              type="text"
              placeholder="Search by title or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-200 bg-white text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-purple-400 text-lg">No artworks found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((art) => (
              <div
                key={art.id}
                className="group rounded-2xl overflow-hidden bg-white border border-purple-100 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all"
              >
                <div className="overflow-hidden aspect-square">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800">
                        {art.title}
                      </h3>
                      <p className="text-sm text-purple-400 mt-0.5">{art.artist}</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600">
                      {art.price}
                    </span>
                  </div>
                  <span className="inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                    {art.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Exhibit;
