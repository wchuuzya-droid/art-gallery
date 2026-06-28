import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { Artwork, ArtworkInsert, ArtworkUpdate } from "../lib/database.types";

export function useArtworks(publishedOnly = false) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("artworks")
      .select("*")
      .order("created_at", { ascending: false });

    if (publishedOnly) {
      query = query.eq("status", "Published");
    }

    const { data, error: err } = await query;

    if (err) {
      setError(err.message);
    } else {
      setArtworks((data ?? []) as Artwork[]);
    }
    setLoading(false);
  }, [publishedOnly]);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  const addArtwork = async (artwork: ArtworkInsert) => {
    const { data, error: err } = await supabase
      .from("artworks")
      .insert(artwork)
      .select()
      .single();

    if (err) {
      setError(err.message);
      return null;
    }

    await supabase.from("activity_log").insert({
      action: "New artwork added",
      detail: `${artwork.title} by ${artwork.artist}`,
    });

    const newArtwork = data as Artwork;
    setArtworks((prev) => [newArtwork, ...prev]);
    return newArtwork;
  };

  const updateArtwork = async (id: string, updates: ArtworkUpdate) => {
    const { data, error: err } = await supabase
      .from("artworks")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (err) {
      setError(err.message);
      return null;
    }

    const updated = data as Artwork;
    setArtworks((prev) => prev.map((a) => (a.id === id ? updated : a)));
    return updated;
  };

  const deleteArtwork = async (id: string) => {
    const artwork = artworks.find((a) => a.id === id);
    const { error: err } = await supabase
      .from("artworks")
      .delete()
      .eq("id", id);

    if (err) {
      setError(err.message);
      return false;
    }

    if (artwork) {
      await supabase.from("activity_log").insert({
        action: "Artwork deleted",
        detail: `${artwork.title} by ${artwork.artist}`,
      });
    }

    setArtworks((prev) => prev.filter((a) => a.id !== id));
    return true;
  };

  const toggleStatus = async (id: string) => {
    const artwork = artworks.find((a) => a.id === id);
    if (!artwork) return null;

    const newStatus = artwork.status === "Published" ? "Draft" : "Published";
    return updateArtwork(id, { status: newStatus });
  };

  return {
    artworks,
    loading,
    error,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    toggleStatus,
    refetch: fetchArtworks,
  };
}

export function useFeaturedArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("artworks")
        .select("*")
        .eq("featured", true)
        .eq("status", "Published")
        .order("created_at", { ascending: false })
        .limit(3);

      setArtworks((data ?? []) as Artwork[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { artworks, loading };
}

export function useTopArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("artworks")
        .select("*")
        .order("views", { ascending: false })
        .limit(4);

      setArtworks((data ?? []) as Artwork[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { artworks, loading };
}

export function useArtworkStats() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { count: c } = await supabase
        .from("artworks")
        .select("*", { count: "exact", head: true })
        .eq("status", "Published");

      setCount(c ?? 0);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { count, loading };
}
