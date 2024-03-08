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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState<string>('');
  const [tickerSymbol, setTickerSymbol] = useState<string>('');
  const [price, setPrice] = useState<number>(NaN);
  const [color, setColor] = useState<string>('red');
  const [pogID, setPogID] = useState<number>(NaN);

  const handleCreatePogger = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, tickerSymbol, price, color });

    try {
      const res = await fetch(
        `http://localhost:8080/api/pogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            ticker_symbol: tickerSymbol,
            price,
            color
          }),
        },
      );

      if (res.ok) {
        const pogID: number = await res.json();

        console.log(pogID, 'sjaj');
        console.log(res.status, 'status');
        router.push(`/pog-details/${pogID}`)
      } else {
        console.error("HTTP error:", res.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="bg-gray-900 flex flex-col gap-8 min-w-96">
      <h1 className="text-3xl font-bold m-auto">Pog Time!</h1>
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
                <div className="grid grid-cols-1 items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                        Color
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup value={color} onValueChange={setColor}>
                        <DropdownMenuRadioItem value="red" className="text-red-500">Red</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="green" className="text-green-500">Green</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="blue" className="text-blue-500">Blue</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="yellow" className="text-yellow-500">Yellow</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="white" className="text-white">White</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="orange" className="text-orange-500">Orange</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="pink" className="text-pink-500">Pink</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="gray" className="text-gray-500">Gray</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="violet" className="text-violet-500">Violet</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
          <h1 className="text-lg"> View All Poggers </h1>
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
            <h1 className="text-md"> View Pogger</h1>
          </Button>
        </div>
      </div>
    </main>
  );
}
