'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Form,
	FormControl,
    FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { updateVehicle, deleteVehicle } from '@/lib/actions/vehicle.actions'
import { vehicleValidationSchema } from '@/lib/validations/schemas'

import { useRouter, usePathname } from 'next/navigation'

export function VehicleForm({car}) {
	const router = useRouter()
	const pathname = usePathname()
	if (car) {
		car = JSON.parse(car)
	}

	const form = useForm({
		resolver: zodResolver(vehicleValidationSchema),
		defaultValues: {
			make: car?.make || '',
			model: car?.model || '',
			year: car?.year || '',
			registration: car?.registration || '',
		},
	})

	async function onSubmit(values) {
        const success = await updateVehicle(car?._id, values, pathname)
		if (success) {
			if (pathname.includes("/fleet/")) {
				router.back()
			} else {
				router.push('/fleet')
			}
		}
	}

	async function onDelete() {
		const success = await deleteVehicle(car._id, pathname) 
		if (success) {
			router.push("/fleet")
		} else {
			
		}
	}

	return (
		<Form {...form}>
			<form action={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='make'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Make</FormLabel>
							<FormControl>
								<Input placeholder='Mercedes-Benz' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='model'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model</FormLabel>
							<FormControl>
								<Input placeholder='E220' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='year'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year</FormLabel>
							<FormControl>
								<Input type='number' min={1990} max={2040} placeholder={2023} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='registration'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Registration</FormLabel>
							<FormControl>
								<Input placeholder='ABC123' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex place-content-between'>
					<Button type='submit'>Submit</Button>
					{car && 
						<Button type='button' variant='destructive' 
							onClick={onDelete}
						>Delete</Button>
					}
					<Button type='button' variant='secondary'
						onClick={() => (router.back())}
					>Back</Button>
				</div>
			</form>
		</Form>
	)
}
