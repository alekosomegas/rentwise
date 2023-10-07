import { Button } from "@/components/ui/button"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getAllCars } from "@/lib/actions/cars.actions"
import Link from 'next/link'

async function getData() {
  const cars = await getAllCars()
  return cars.map(car => ({id: car.id, make: car.make, model: car.model, year:car.year, registration: car.registration}))
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <h2 className="head-text">Fleet</h2>
      <Button><Link href={'/fleet/create'}>Add Vehicle</Link></Button>
      <DataTable columns={columns} data={data} />
    </div>
  )
}