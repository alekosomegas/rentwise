import { VehicleForm } from "@/components/forms/VehicleForm";
import PriceChart from "@/components/shared/PriceChart";
import { fetchInsurances } from "@/lib/actions/extras.actions";
import { fetchGroups } from "@/lib/actions/group.actions";
import { fetchOwners } from "@/lib/actions/owner.actions";
import { fetchVehicle } from "@/lib/actions/vehicle.actions";

export default async function Page({ params }) {
    const groups = fetchGroups()
    const owners = fetchOwners()
    const vehicle = fetchVehicle(params.id) 
    const insurances = fetchInsurances()

    const result = await Promise.all([groups, owners, vehicle, insurances])
    const data = {
        groups: result[0],
        owners: result[1],
        vehicle: JSON.parse(result[2]),
        insurances: result[3]
    }
    return (
        <>
            <h2 className="head-text">Edit</h2>
            <VehicleForm data={JSON.stringify(data)} />
            <div className="p-2 mt-6">
                <h2>Price Distribution</h2>
            <PriceChart vehicle={JSON.stringify(data.vehicle)} />

            </div>
        </>
    )
}
