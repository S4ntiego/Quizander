"use client"

import * as React from "react"
import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Quiz } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "../ui/toast"

interface QuizOperationsProps {
  quiz: Pick<Quiz, "id" | "title">
}

export function QuizOperations({ quiz }: QuizOperationsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)

  async function deleteQuiz(quizId: number) {
    setIsFetching(true)
    const response = await fetch(`/api/quiz/${quizId}`, {
      method: "DELETE",
    })

    if (!response?.ok) {
      toast({
        title: "Something went wrong.",
        message:
          "Quiz could not be deleted. Please try again. You can delete only your own quizzes.",
        type: "error",
      })
    } else {
      toast({
        title: "Quiz deleted",
        message: "Quiz has been successfully deleted.",
        type: "success",
      })
    }

    startTransition(() => {
      setIsFetching(false)
      setShowDeleteAlert(false)
      router.refresh()
    })
  }

  return (
    <>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors dark:hover:bg-slate-700 hover:bg-slate-50 dark:border-slate-600">
            <Icons.ellipsis className="h-4 w-4" />
            <span className="sr-only">Open</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href={`/dashboard/editor/${quiz.id}`}
                className="flex w-full"
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialogTrigger className="w-full">
              <DropdownMenuItem className="flex cursor-pointer items-center text-red-600 focus:bg-red-50">
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              given quiz and remove data from our servers. You can delete only
              your own quizzes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={cn(
                "bg-red-500 dark:bg-red-700 dark:text-slate-50 text-white hover:bg-red-600 dark:hover:bg-slate-700"
              )}
              onClick={async (event) => {
                event.preventDefault()
                await deleteQuiz(quiz.id)
              }}
            >
              {isFetching ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
