import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Pogs } from "@/lib/types";
import PogComponent from "./pogComponent";

async function getData(id: number): Promise<Pogs[]> {
  let url = "http://localhost:8080/api/pogs";
  if (id !== 0) { url += `/${id}` };

  const res = await fetch(url, {
    cache: 'no-store',
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  return res.json();
}

export default async function PogDetails({ params }: { params: { id: number } }) {
  const id = Number(params.id);
  const pogs: Pogs[] = await getData(id);

  return (
    <div className="bg-gray-900">
      <div className="mb-3 flex items-center">
        <Link href="/" className="text-lg font-bold text-black">
          <ChevronLeft color="white" className="h-8 w-8" />
        </Link>
        <h1 className="ml-2 text-2xl font-bold">Go back</h1>
      </div>

      {isNaN(id) ? (
        <div>you are not supposed to see this</div>
      ) : pogs.length === 0 ? (
        <div>404 cannot find pogs.</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {pogs.map((pog, index) => (
            <PogComponent key={index} pog={pog} />
          ))}
        </div>
      )}
    </div>
  )
}