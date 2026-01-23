/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BackButton from "@/components/logo/BackButton";
import LogoComponent from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserPasswordProfileMutation } from "@/lib/redux/features/api/profile/profileSliceApi";
import { Save } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { ClipLoader } from "react-spinners";
import { DialogTriggerComponent } from "./DialogTriggerComponent";
import { toast } from "sonner";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [updateUserPasswordProfile, { isLoading, isError }] =
    useUpdateUserPasswordProfileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateUserPasswordProfile({
        body: {
          currentPassword,
          newPassword: password,
          confirmPassword,
        },
      }).unwrap();

      if (result?.success) {
        setIsOpen(true);
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to change password");
      }
    } catch (error: any) {
      setErrorMsg(error?.data?.message);
      toast.error((error as string) || "Failed to change password");
    }
  };

  return <></>;
}
