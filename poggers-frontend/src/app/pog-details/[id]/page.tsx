export default function PogDetails({ params }: { params: { id: number } }) {
  const id = Number(params.id)
  if (isNaN(id)) return (<div className="bg-gray-900">not a num</div>)

  if (id === 0) return (<div className="bg-gray-900">show all!!!!</div>)

  return (
    <div className="bg-gray-900">Pog ID: {id}</div>
  )

}