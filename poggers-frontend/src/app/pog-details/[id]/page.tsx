export default function PogDetails({ params }: { params: { id: number } }) {
  return <div className="bg-gray-900">My Post: {params.id}</div>
}