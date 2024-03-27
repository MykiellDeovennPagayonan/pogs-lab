import { Pogs } from "@/lib/types";

export async function getData(id: number): Promise<Pogs[]> {
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

export async function postData(pog: Pogs): Promise<Response> {
  const { name, ticker_symbol, price, color } = pog;

  const res = await fetch(
    `http://localhost:8080/api/pogs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        ticker_symbol,
        price,
        color
      }),
    },
  );

  return res;
}

export async function updateData(pog: Pogs): Promise<Response> {
  const { id, name, ticker_symbol, price, color } = pog;

  const res = await fetch(
    `http://localhost:8080/api/pogs/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        ticker_symbol,
        price,
        color
      }),
    },
  );

  return res;
}

export async function deleteData(id: number): Promise<Response> {
  const res = await fetch(
    `http://localhost:8080/api/pogs/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res;
}