"use client";

import { Pogs, colorVariants } from "@/lib/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { deleteData, updateData } from "@/app/pogActions";

export default function PogComponent({ pog }: { pog: Pogs }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(pog.name);
  const [tickerSymbol, setTickerSymbol] = useState<string>(pog.ticker_symbol);
  const [price, setPrice] = useState<number>(pog.price);
  const [color, setColor] = useState<string>(pog.color);

  const router = useRouter();
  const { toast } = useToast();

  const handleUpdatePogger = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pogDetails: Pogs = {
      id: pog.id,
      name,
      ticker_symbol: tickerSymbol,
      price,
      color: color as keyof typeof colorVariants
    };

    try {
      const res = await updateData(pogDetails);

      if (res.ok) {
        await res.json();

        console.log(res.status, 'status');
        setIsEditDialogOpen(false);
        router.push(`/pog-details/${pog.id}`);
        router.refresh();
      } else {
        console.error("HTTP error:", res.statusText);

        return toast({
          variant: "destructive",
          title: `Having trouble updating pog (Code ${res.status})`,
          description: "Try again, making sure to enter the corrent details",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const handleDeletePogger = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await deleteData(pog.id!);

      if (res.ok) {
        await res.json();

        console.log(res.status, 'status');
        setIsDeleteDialogOpen(false);
        router.refresh();
      } else {
        console.error("HTTP error:", res.statusText);

        return toast({
          variant: "destructive",
          title: `Having trouble deleting pog (Code ${res.status})`,
          description: "Try again.",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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

      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <form onSubmit={handleUpdatePogger}>
              <DialogHeader>
                <DialogTitle>Edit Pog</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Edit the details of this pog.
              </DialogDescription>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    defaultValue={pog.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ticker-symbol" className="text-right">
                    Ticker Symbol
                  </Label>
                  <Input
                    id="ticker-symbol"
                    className="col-span-3"
                    defaultValue={pog.ticker_symbol}
                    onChange={(e) => setTickerSymbol(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price ₱
                  </Label>
                  <Input
                    id="price"
                    className="col-span-3"
                    defaultValue={pog.price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Color
                  </Label>
                  <Select defaultValue={pog.color} onValueChange={setColor}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red" className="text-red-500">Red</SelectItem>
                      <SelectItem value="green" className="text-green-500">Green</SelectItem>
                      <SelectItem value="blue" className="text-blue-500">Blue</SelectItem>
                      <SelectItem value="yellow" className="text-yellow-500">Yellow</SelectItem>
                      <SelectItem value="white" className="text-white">White</SelectItem>
                      <SelectItem value="orange" className="text-orange-500">Orange</SelectItem>
                      <SelectItem value="pink" className="text-pink-500">Pink</SelectItem>
                      <SelectItem value="gray" className="text-gray-500">Gray</SelectItem>
                      <SelectItem value="violet" className="text-violet-500">Violet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant={"outline"} onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {isDeleteDialogOpen && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <form onSubmit={handleDeletePogger}>
              <DialogHeader>
                <DialogTitle>Delete Pog</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to delete this pog? This action cannot be undone.
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                <Button variant={"destructive"} type="submit">Delete</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
