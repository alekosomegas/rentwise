import { OrderForm } from "@/components/forms/OrderForm";
import { fetchClientsList } from "@/lib/actions/client.actions";
import { fetchVehiclesList } from "@/lib/actions/vehicle.actions";

// TODO use Promise all to avoid waterfall?
export default async function Page(props) {
    const vehicles = JSON.stringify(await fetchVehiclesList())
    const clients = JSON.stringify(await fetchClientsList())

    return (
        <main>
            <h2 className="head-text">Add a new Order</h2>
            <OrderForm vehicles={vehicles} clients={clients}/>
        </main>
    )
}
