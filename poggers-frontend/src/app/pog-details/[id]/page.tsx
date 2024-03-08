import { Pogs } from "@/lib/types"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

async function getData(): Promise<Pogs[]> {
  const res = await fetch("http://localhost:8080/api/pogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Error fetching pog");
  }

  return res.json();
}

export default async function PogDetails({ params }: { params: { id: number } }) {
  const id = Number(params.id)
  const pogs = await getData();
  console.log(pogs, ' jsjs');
  
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
      ) : id === 0 ? (
        <div>
          {pogs.length === 0 ? (
            <div>404 not found... Create a new pog!</div>
          ) : (
            <div>
              {pogs.map((pog, index) => (
                <div key={index}>{pog.name}</div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>Pog ID: {id}</div>
      )}
    </div>
  )
}