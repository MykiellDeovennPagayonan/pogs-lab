"use client";

import { Pogs } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { useState } from "react";

export default function PogComponent({ pog }: { pog: Pogs }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)

  const colorVariants = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    white: 'bg-white text-black',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
    gray: 'bg-gray-500',
    violet: 'bg-violet-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center w-full">
          <div className="basis-[90%]">{pog.name}</div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <GripVertical
                className="basis-[10%]"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>{pog.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${colorVariants[pog.color]} m-auto rounded-full flex flex-col items-center p-3 relative`} style={{
          height: "200px",
          width: "200px",
          fontSize: "20px",
        }}>
          <p className="text-base">#{pog.id}</p>
          <p className="font-bold absolute inset-0 flex items-center justify-center text-xl">
            {pog.ticker_symbol.toUpperCase()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-right w-full">
          ₱{Number(pog.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </CardFooter>

      {/* Move the Dialog components outside of the Card */}
      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            {/* Dialog content for editing */}
            <DialogHeader>
              <DialogTitle>Edit Pog</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Edit the details of this pog.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isDeleteDialogOpen && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            {/* Dialog content for deleting */}
            <DialogHeader>
              <DialogTitle>Delete Pog</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this pog? This action cannot be undone.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
