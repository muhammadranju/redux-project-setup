/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useUpdateUserPhotoProfileMutation } from "@/lib/redux/features/api/profile/profileSliceApi";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePhoto() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { refetch } = useAuthCheck();
  const [updateUserPhotoProfile, { isLoading }] =
    useUpdateUserPhotoProfileMutation();
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) return;

    const formData = new FormData();
    formData.append("image", photo);

    try {
      await updateUserPhotoProfile(formData).unwrap();

      refetch();
      router.back();
      toast.success("Photo profile updated successfully");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error?.data?.message || "Failed to update photo profile");
    }
  };

  const handleClear = () => {
    setPhoto(null);
    setPreview(null);
    const input = document.getElementById("photo-input") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  return <></>;
}
