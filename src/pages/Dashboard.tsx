import {
  TrendingUp,
  Eye,
  DollarSign,
  Image,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";
import { useTopArtworks } from "../hooks/useArtworks";
import { useActivityLog, useSiteStats, formatTimeAgo } from "../hooks/useDashboard";

const statIcons: Record<string, typeof DollarSign> = {
  "Total Revenue": DollarSign,
  "Page Views": Eye,
  "Artworks Listed": Image,
  "Conversion Rate": TrendingUp,
};

function Dashboard() {
  const { stats, loading: statsLoading } = useSiteStats();
  const { activities, loading: activityLoading } = useActivityLog();
  const { artworks: topArtworks, loading: artworksLoading } = useTopArtworks();

  const loading = statsLoading || activityLoading || artworksLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

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
          const Icon = statIcons[stat.key] ?? TrendingUp;
          return (
            <div
              key={stat.key}
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
              <p className="text-xs text-purple-400 mt-1">{stat.key}</p>
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
            {activities.map((item) => (
              <div
                key={item.id}
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
                  {formatTimeAgo(item.created_at)}
                </span>
              </div>
            ))}
            {activities.length === 0 && (
              <p className="text-sm text-purple-400 text-center py-4">
                No recent activity
              </p>
            )}
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
                  key={art.id}
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
              {topArtworks.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="py-8 text-center text-purple-400 text-sm"
                  >
                    No artworks yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
