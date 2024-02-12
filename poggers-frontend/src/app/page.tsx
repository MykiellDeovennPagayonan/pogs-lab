import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 h-screen w-screen bg-gray-900 p-24">
      <div className="flex w-full h-24 bg-white rounded-md p-8">
        <h1 className="text-2xl font-bold my-auto"> Name </h1>
      </div>
      <button className="flex w-3/5 h-16 bg-white rounded-md">
        <h1 className="text-2xl font-bold m-auto"> New Pogger </h1>
      </button>
    </main>
  );
}
