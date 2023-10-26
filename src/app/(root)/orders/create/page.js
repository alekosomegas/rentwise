import { OrderForm } from '@/components/forms/OrderForm'
import { fetchClientsList } from '@/lib/actions/client.actions'
import { fetchEquipment, fetchInsurances } from '@/lib/actions/extras.actions'
import { fetchVehicles } from '@/lib/actions/vehicle.actions'

export default async function Page(props) {
	const vehicles = fetchVehicles()
	const clients = fetchClientsList()
    const equipment = fetchEquipment()
	const insurances = fetchInsurances()

	const result = await Promise.all([vehicles, clients, equipment, insurances])
	const data = {
		vehicles: result[0],
		clients: result[1],
		equipment: result[2],
		insurances: result[3],
	}

	return (
		<div className=''>
			<h2 className='head-text'>Add a new Order</h2>
			<OrderForm data={JSON.stringify(data)} />
		</div>
	)
}
