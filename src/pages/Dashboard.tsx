import {
  TrendingUp,
  Eye,
  DollarSign,
  Image,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$24,500", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Page Views", value: "18,240", change: "+8.2%", up: true, icon: Eye },
  { label: "Artworks Listed", value: "156", change: "+3", up: true, icon: Image },
  { label: "Conversion Rate", value: "3.2%", change: "-0.4%", up: false, icon: TrendingUp },
];

const recentActivity = [
  { action: "New artwork added", detail: "Violet Horizon by Maya Chen", time: "2 hours ago" },
  { action: "Sale completed", detail: "Ethereal Dreams - $1,800", time: "5 hours ago" },
  { action: "New inquiry", detail: "From collector James W.", time: "8 hours ago" },
  { action: "Exhibit updated", detail: "Spring Collection 2026", time: "1 day ago" },
  { action: "New artist registered", detail: "Sofia Laurent - Photography", time: "2 days ago" },
];

const topArtworks = [
  { title: "Marble Whisper", artist: "Takeshi Mori", views: 1240, sales: 3 },
  { title: "Violet Horizon", artist: "Maya Chen", views: 980, sales: 5 },
  { title: "Neon Pulse", artist: "David Kim", views: 870, sales: 8 },
  { title: "Golden Hour", artist: "Sofia Laurent", views: 650, sales: 2 },
];

function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-900">Dashboard</h1>
        <p className="text-purple-400 text-sm mt-1">
          Overview of your art gallery performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-purple-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${
                    stat.up ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {stat.up ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-800">{stat.value}</p>
              <p className="text-xs text-purple-400 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-purple-100 p-6">
          <h2 className="text-lg font-semibold text-purple-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-4 border-b border-purple-50 last:border-0 last:pb-0"
              >
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-purple-800">
                    {item.action}
                  </p>
                  <p className="text-xs text-purple-400 mt-0.5">
                    {item.detail}
                  </p>
                </div>
                <span className="text-xs text-purple-300 shrink-0">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Artworks */}
        <div className="bg-white rounded-xl border border-purple-100 p-6">
          <h2 className="text-lg font-semibold text-purple-800 mb-4">
            Top Artworks
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="text-left pb-3 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                  Artwork
                </th>
                <th className="text-right pb-3 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="text-right pb-3 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                  Sales
                </th>
              </tr>
            </thead>
            <tbody>
              {topArtworks.map((art) => (
                <tr
                  key={art.title}
                  className="border-b border-purple-50 last:border-0"
                >
                  <td className="py-3">
                    <p className="text-sm font-medium text-purple-800">
                      {art.title}
                    </p>
                    <p className="text-xs text-purple-400">{art.artist}</p>
                  </td>
                  <td className="py-3 text-right text-sm text-purple-500">
                    {art.views.toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-sm font-medium text-purple-700">
                    {art.sales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
