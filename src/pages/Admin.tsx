import { useState } from "react";
import { Plus, Pencil, Trash2, Image } from "lucide-react";

interface ArtItem {
  id: number;
  title: string;
  artist: string;
  category: string;
  price: string;
  status: "Published" | "Draft";
}

const initialArt: ArtItem[] = [
  { id: 1, title: "Violet Horizon", artist: "Maya Chen", category: "Paintings", price: "$2,400", status: "Published" },
  { id: 2, title: "Ethereal Dreams", artist: "Lucas Rivera", category: "Digital", price: "$1,800", status: "Published" },
  { id: 3, title: "Abstract Flow", artist: "Aisha Patel", category: "Paintings", price: "$3,200", status: "Draft" },
  { id: 4, title: "Neon Pulse", artist: "David Kim", category: "Digital", price: "$950", status: "Published" },
  { id: 5, title: "Golden Hour", artist: "Sofia Laurent", category: "Photography", price: "$1,200", status: "Published" },
  { id: 6, title: "Marble Whisper", artist: "Takeshi Mori", category: "Sculpture", price: "$5,500", status: "Draft" },
];

function Admin() {
  const [artItems, setArtItems] = useState<ArtItem[]>(initialArt);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", artist: "", category: "Paintings", price: "" });

  const handleAdd = () => {
    if (!formData.title || !formData.artist || !formData.price) return;
    const newItem: ArtItem = {
      id: Date.now(),
      ...formData,
      status: "Draft",
    };
    setArtItems([newItem, ...artItems]);
    setFormData({ title: "", artist: "", category: "Paintings", price: "" });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setArtItems(artItems.filter((item) => item.id !== id));
  };

  const toggleStatus = (id: number) => {
    setArtItems(
      artItems.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Published" ? "Draft" : "Published" }
          : item
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">Manage Artworks</h1>
          <p className="text-purple-400 text-sm mt-1">Add, edit and manage your art collection</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium cursor-pointer border-0 hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Artwork
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-purple-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
            <Image className="w-5 h-5" />
            New Artwork
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-purple-200 text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Artist"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-purple-200 text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-purple-200 text-sm text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            >
              <option>Paintings</option>
              <option>Digital</option>
              <option>Sculpture</option>
              <option>Photography</option>
              <option>Mixed Media</option>
            </select>
            <input
              type="text"
              placeholder="Price (e.g., $1,200)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-purple-200 text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAdd}
              className="px-5 py-2.5 bg-purple-600 text-white rounded-lg font-medium cursor-pointer border-0 hover:bg-purple-700 transition-colors text-sm"
            >
              Save Artwork
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 bg-purple-100 text-purple-600 rounded-lg font-medium cursor-pointer border-0 hover:bg-purple-200 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-100 bg-purple-50/50">
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">Title</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">Artist</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">Category</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">Price</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">Status</th>
              <th className="text-right py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artItems.map((item) => (
              <tr key={item.id} className="border-b border-purple-50 hover:bg-purple-50/30 transition-colors">
                <td className="py-3.5 px-5 text-sm font-medium text-purple-800">{item.title}</td>
                <td className="py-3.5 px-5 text-sm text-purple-500">{item.artist}</td>
                <td className="py-3.5 px-5 text-sm text-purple-500">{item.category}</td>
                <td className="py-3.5 px-5 text-sm font-medium text-purple-700">{item.price}</td>
                <td className="py-3.5 px-5">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={`text-xs font-medium px-3 py-1 rounded-full cursor-pointer border-0 ${
                      item.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="py-3.5 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg text-purple-400 hover:bg-purple-100 hover:text-purple-600 cursor-pointer border-0 bg-transparent transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 cursor-pointer border-0 bg-transparent transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
