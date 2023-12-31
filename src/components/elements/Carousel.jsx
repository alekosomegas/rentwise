'use client'

import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { CldImage } from 'next-cloudinary'

function ThumbnailPlugin(mainRef) {
	return (slider) => {
		function removeActive() {
			slider.slides.forEach((slide) => {
				slide.classList.remove('active')
			})
		}
		function addActive(idx) {
			slider.slides[idx].classList.add('active')
		}

		function addClickEvents() {
			slider.slides.forEach((slide, idx) => {
				slide.addEventListener('click', () => {
					if (mainRef.current) mainRef.current.moveToIdx(idx)
				})
			})
		}

		slider.on('created', () => {
			if (!mainRef.current) return
			addActive(slider.track.details?.rel)
			addClickEvents()
			mainRef.current.on('animationStarted', (main) => {
				removeActive()
				const next = main.animator.targetIdx || 0
				addActive(main.track.absToRel(next))
				slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
			})
		})
	}
}

export default function Carousel({ photos }) {
	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
	})
	const [thumbnailRef] = useKeenSlider(
		{
			initial: 0,
			slides: {
				perView: 4,
				spacing: 10,
			},
		},
		[ThumbnailPlugin(instanceRef)]
	)

	return (
		<div className=''>
			<div ref={sliderRef} className='keen-slider'>
				{photos.map((img, i) => {
					return (
						<div key={i} className={`keen-slider__slide number-slide${i}`}>
							<CldImage
								width='400'
								height='300'
								src={img}
								sizes='100vw'
								alt='Description of my image'
							/>
						</div>
					)
				})}
			</div>

			<div ref={thumbnailRef} className='keen-slider thumbnail mt-1'>
				{photos.map((img, i) => {
					return (
						<div key={i} className={`keen-slider__slide number-slide${i}`}>
							<CldImage
								width='100'
								height='75'
								src={img}
								sizes='100vw'
								alt='Description of my image'
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}
