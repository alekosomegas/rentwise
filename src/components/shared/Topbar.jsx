import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import SignOutCard from '../elements/SignOutCard'

export default function Topbar() {
	return (
		<nav className='topbar'>
			<Link href='/' className='flex items-center gap-4'>
				<Image src='/assets/logo.svg' alt='logo' width={36} height={36} />
				<p className='text-heading3-bold text-light-1 max-xs:hidden'>rentwise</p>
			</Link>

			<div className='flex items-center gap-1'>
				<div className='block md:hidden'>
					<SignedIn>
						<SignOutCard />
						{/* <SignOutButton>
							<div className='flex cursor-pointer'>
								<Image
									src='/assets/logout.svg'
									alt='logout'
									width={24}
									height={24}
								/>
							</div>
						</SignOutButton> */}
					</SignedIn>
				</div>
			</div>
		</nav>
	)
}
