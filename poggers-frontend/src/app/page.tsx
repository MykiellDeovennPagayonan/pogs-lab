"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Pogs, colorVariants } from "@/lib/types";
import { postData } from "./actions";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState<string>('');
  const [tickerSymbol, setTickerSymbol] = useState<string>('');
  const [price, setPrice] = useState<number>(NaN);
  const [color, setColor] = useState<string>('red');
  const [pogID, setPogID] = useState<number>(NaN);

  useEffect(() => {
    router.refresh();
  }, [router]);

  const handleCreatePogger = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pogDetails: Pogs = {
      name,
      ticker_symbol: tickerSymbol,
      price,
      color: color as keyof typeof colorVariants
    };

    try {
      const res = await postData(pogDetails);

      if (res.ok) {
        const pog: Pogs[] = await res.json();

        console.log(res.status, 'status');
        router.push(`/pog-details/${pog[0].id}`)
      } else {
        console.error("HTTP error:", res.statusText);

        return toast({
          variant: "destructive",
          title: `Having trouble creating pog (Code ${res.status})`,
          description: "Make sure name and ticker symbol are unique!",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="bg-gray-900 flex flex-col gap-8 min-w-96">
      <h1 className="text-4xl font-bold m-auto uppercase text-red-400">Pog Time!</h1>
      <h2 className="text-base m-auto -mt-8">by the PROgrammers!</h2>
      <div className="grid grid-cols-1 gap-6 justify-items-center w-96 min-w-44 m-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                setName('');
                setTickerSymbol('');
                setPrice(NaN);
              }}
            >
              <h1 className="text-lg"> Create New Pogger </h1>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreatePogger}>
              <DialogHeader>
                <DialogTitle>Create new pogger</DialogTitle>
                <DialogDescription>
                  Kindly input pog details below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
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
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Color
                  </Label>
                  <Select defaultValue={color} onValueChange={setColor}>
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
                <DialogClose asChild>
                  <Button
                    type="submit"
                    disabled={
                      isNaN(price) ||
                      name.trim().length <= 2 ||
                      tickerSymbol.trim().length <= 2
                    }
                  >
                    Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          variant="default"
          className="w-full"
          onClick={() => router.push("/pog-details/0")}
        >
          <h1 className="text-lg">View All Poggers </h1>
        </Button>

        <div className="w-full flex flex-row gap-2">
          <div className="basis-3/4 grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pog-id" className="text-right">
              Pog ID
            </Label>
            <Input
              id="pog-id"
              className="col-span-3"
              onChange={(e) => setPogID(Number(e.target.value))}
            />
          </div>
          <Button
            variant="default"
            className="basis-1/4"
            onClick={() => router.push(`/pog-details/${pogID}`)}
            disabled={isNaN(pogID) || pogID === 0}
          >
            <h1 className="text-md">View Pogger</h1>
          </Button>
        </div>
      </div>
    </main>
  );
}
