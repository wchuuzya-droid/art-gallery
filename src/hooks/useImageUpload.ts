import { useState } from "react";
import { supabase } from "../lib/supabase";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File): Promise<string | null> => {
    setUploading(true);
    setError(null);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `artworks/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("artwork-images")
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("artwork-images").getPublicUrl(filePath);

    setUploading(false);
    return publicUrl;
  };

  return { upload, uploading, error };
}
