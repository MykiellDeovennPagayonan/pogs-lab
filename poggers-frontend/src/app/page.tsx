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
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [tickerSymbol, setTickerSymbol] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [color, setColor] = useState<string>('red');

  const handleCreatePogger = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, tickerSymbol, price, color });

    // insert the await api POST request
    //then make it return the id of the created pogger
    // once created, router.push(/pogger-detail/:id)
  };

  return (
    <main className="bg-gray-900 flex flex-col gap-6 min-w-96">
      <h1 className="text-3xl font-bold m-auto">Pog Time!</h1>
      <div className="grid grid-cols-1 gap-6 justify-items-center w-96 min-w-44 m-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="w-full"
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
                  <Button type="submit">Create</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          variant="default"
          className="w-full"
          onClick={() => router.push("/pog-details/all")}
        >
          <h1 className="text-lg"> View All Poggers </h1>
        </Button>

        <Button
          variant="default"
          className="w-full"
          onClick={() => router.push(`/pog-details/${2}`)}
        >
          <h1 className="text-lg"> View a Pogger </h1>
        </Button>
      </div>
    </main>
  );
}
