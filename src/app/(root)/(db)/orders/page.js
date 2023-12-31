import { orderColumns } from '@/components/tables/columns'
import { Button } from '@nextui-org/button'
import {
	fetchOrders,
	totalCountOrders,
	createFromCSV,
} from '@/lib/actions/order.actions'
import Link from 'next/link'
import { DEFAULT_LIMIT } from '@/constants'
import TableUI from '@/components/tables/table'
import UploadCSVFile from '@/components/shared/UploadCSVFile'
import SearchInput from '@/components/shared/SearchInput'

async function getData(page, limit, sortColumn, sortDirection, searchTerm) {
	const result = await fetchOrders(
		page,
		limit,
		sortColumn,
		sortDirection,
		searchTerm
	)
	const orders = result
	return JSON.stringify(orders)
}

export default async function Page({ searchParams }) {
	const page = searchParams.page || 1
	const limit = searchParams.limit || DEFAULT_LIMIT
	const sortColumn = searchParams.sortColumn || 'number'
	const sortDirection = searchParams.sortDirection || 'descending'
	const searchTerm = searchParams.search
		? !isNaN(searchParams.search)
			? {
					number: Number(searchParams.search),
			  }
			: {
					$or: [
						{ status: searchParams.search },
					],
			  }
		: {}
	const data = await getData(page, limit, sortColumn, sortDirection, searchTerm)

	return (
		<div className=''>
			<div className='flex place-content-between mb-3 items-baseline'>
				<h2 className='head-text'>Orders</h2>
				<Button color='secondary' className=''>
					<Link href={'/orders/create'}>Add Order</Link>
				</Button>
			</div>
			<SearchInput />
			<TableUI columns={orderColumns} data={data} />

			<UploadCSVFile action={createFromCSV} />
		</div>
	)
}
