import { useState } from "react";
import { Plus, Pencil, Trash2, Image, Upload, Loader2 } from "lucide-react";
import { useArtworks } from "../hooks/useArtworks";
import { useImageUpload } from "../hooks/useImageUpload";

function Admin() {
  const { artworks, loading, addArtwork, deleteArtwork, toggleStatus } =
    useArtworks();
  const { upload, uploading } = useImageUpload();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    category: "Paintings",
    price: "",
    medium: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.artist || !formData.price) return;
    setSaving(true);

    let imageUrl: string | null = null;
    if (imageFile) {
      imageUrl = await upload(imageFile);
    }

    const priceNum = parseFloat(formData.price.replace(/[$,]/g, ""));

    await addArtwork({
      title: formData.title,
      artist: formData.artist,
      category: formData.category,
      price: isNaN(priceNum) ? 0 : priceNum,
      medium: formData.medium || null,
      image_url: imageUrl,
      status: "Draft",
    });

    setFormData({
      title: "",
      artist: "",
      category: "Paintings",
      price: "",
      medium: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setShowForm(false);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await deleteArtwork(id);
  };

  const handleToggleStatus = async (id: string) => {
    await toggleStatus(id);
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">
            Manage Artworks
          </h1>
          <p className="text-purple-400 text-sm mt-1">
            Add, edit and manage your art collection
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium cursor-pointer border-0 hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Artwork
        </button>
      </div>

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
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="px-4 py-2.5 rounded-lg border border-purple-200 text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Artist"
              value={formData.artist}
              onChange={(e) =>
                setFormData({ ...formData, artist: e.target.value })
              }
              className="px-4 py-2.5 rounded-lg border border-purple-200 text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
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
              placeholder="Price (e.g., 1200)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="px-4 py-2.5 rounded-lg border border-purple-200 text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Medium (e.g., Oil on Canvas)"
              value={formData.medium}
              onChange={(e) =>
                setFormData({ ...formData, medium: e.target.value })
              }
              className="px-4 py-2.5 rounded-lg border border-purple-200 text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-purple-300 text-sm text-purple-500 cursor-pointer hover:bg-purple-50 transition-colors">
                <Upload className="w-4 h-4" />
                {imageFile ? imageFile.name : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAdd}
              disabled={saving || uploading}
              className="px-5 py-2.5 bg-purple-600 text-white rounded-lg font-medium cursor-pointer border-0 hover:bg-purple-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving || uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Artwork"
              )}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setImageFile(null);
                setImagePreview(null);
              }}
              className="px-5 py-2.5 bg-purple-100 text-purple-600 rounded-lg font-medium cursor-pointer border-0 hover:bg-purple-200 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-100 bg-purple-50/50">
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                Title
              </th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                Artist
              </th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-3 px-5 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((item) => (
              <tr
                key={item.id}
                className="border-b border-purple-50 hover:bg-purple-50/30 transition-colors"
              >
                <td className="py-3.5 px-5 text-sm font-medium text-purple-800">
                  <div className="flex items-center gap-3">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    )}
                    {item.title}
                  </div>
                </td>
                <td className="py-3.5 px-5 text-sm text-purple-500">
                  {item.artist}
                </td>
                <td className="py-3.5 px-5 text-sm text-purple-500">
                  {item.category}
                </td>
                <td className="py-3.5 px-5 text-sm font-medium text-purple-700">
                  {formatPrice(item.price)}
                </td>
                <td className="py-3.5 px-5">
                  <button
                    onClick={() => handleToggleStatus(item.id)}
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
            {artworks.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-purple-400 text-sm"
                >
                  No artworks yet. Click &quot;Add Artwork&quot; to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
