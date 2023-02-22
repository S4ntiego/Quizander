"use client";

import React, { useState, useEffect } from "react";
import { useStateContext } from "@/context";
import { useForm } from "react-hook-form";
import { TypeOf, z, string, object } from "zod";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserFn } from "@/api/authApi";

const updateUserSchema = object({
  name: string().min(1, "Name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  createdAt: string().min(1, "Member since is required"),
}).partial();

type UpdateUserInput = TypeOf<typeof updateUserSchema>;

export function Profile() {
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const { isLoading, mutate: updateUser } = useMutation(
    (updateData: UpdateUserInput) => updateUserFn(updateData),
    {
      onSuccess: () => {
        toast.success("User updated successfully");
      },
      onError: (error: any) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

  const methods = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = (updateData: any) => {
    updateUser(updateData);
  };

  useEffect(() => {
    if (user) {
      methods.reset({
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    }
  }, [user]);

  return (
    <div className="container h-full max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <br />
          <input {...methods.register("name")} />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" {...methods.register(`email`)} />
          <br />
          <label htmlFor="createdAt">Member since</label>
          <br />
          <input type="text" {...methods.register(`createdAt`)} />
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
