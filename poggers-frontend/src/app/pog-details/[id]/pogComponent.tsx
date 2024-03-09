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
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

export default function PogComponent({ pog }: { pog: Pogs }) {
  console.log(pog)
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
              <DropdownMenuItem onClick={() => {
                console.log('edit dialog')
              }}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                console.log('show delete here')
              }}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${colorVariants[pog.color]} m-auto rounded-full flex flex-col items-center p-3 relative`} style={{
          height: "175px",
          width: "175px",
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
    </Card>
  )
}