import React, { useEffect, useState, useCallback } from "react";
import { ImagePlus } from "lucide-react";

const SDK_URL = "https://media.litpixstudio.in/media-uploader.js";
declare global {
  interface Window {
    MediaUploader: any;
  }
}

export interface MediaFile {
  id?: string;
  url: string;
  type?: string;
  name?: string;
  size?: number;
}

export interface MediaUploaderProps {
  value?: string[];
  onChange: (files: string[]) => void;
  project: string;
  userIdentifier: string;
  multiple?: boolean;
  mediaType?: "image" | "video" | "pdf";
}

type MediaUploaderSDK = {
  open: (options: any) => void;
};
const MediaUploader: React.FC<MediaUploaderProps> = ({
  value,
  onChange,
  project,
  userIdentifier,
  multiple = true,
  mediaType,
}) => {
  const apiBase = "https://media-api.litpixstudio.in";
  const [uploaderInstance, setUploaderInstance] =
    useState<MediaUploaderSDK | null>(null);

  const loadSDK = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === "undefined") {
        resolve();
        return;
      }

      if (window.MediaUploader) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = SDK_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }, []);

  useEffect(() => {
    loadSDK().then(() => {
      if (!window.MediaUploader) return;

      const instance = new window.MediaUploader({
        project,
        userIdentifier,
        apiBase,
      });

      setUploaderInstance(instance);
    });
  }, [loadSDK, project, userIdentifier, apiBase]);

  const openUploader = () => {
    if (!uploaderInstance) return;
    uploaderInstance.open({
      title: mediaType === "video" ? "Upload Video" : "Upload Image",
      multiple,
      mediaType,
      selected: value || [],
      onSelect: (files: any) => {
        const normalized = Array.isArray(files) ? files : [files];
        onChange(normalized);
      },
    });
  };

  return (
    <div className="w-full">
      <div
        onClick={openUploader}
        className="p-6 border-dashed border-2 border-gray-200 dark:border-gray-700 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-4">
          <ImagePlus className="h-6 w-6 text-muted-foreground" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Supported formats: JPG, JPEG, PNG
            </p>
            <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
          </div>

          <span className="text-sm border px-3 py-1 rounded-md">
            Select Media
          </span>
        </div>
      </div>
    </div>
  );
};

export default MediaUploader;
