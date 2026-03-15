'use client'

import type { PointerEvent as ReactPointerEvent } from 'react'
import { useEffect, useRef } from 'react'
import { Badge, Group, Paper, Text, Title } from '@mantine/core'
import { sectionContent } from './landing-content'
import { DashboardPreview } from './product-previews'

const MAX_ROTATION = 16
const ACTIVE_SCALE = 1.02

type PointerPosition = {
	x: number
	y: number
}

function resetPreviewStyles(node: HTMLDivElement) {
	node.style.setProperty('--hero-preview-rotate-x', '0deg')
	node.style.setProperty('--hero-preview-rotate-y', '0deg')
	node.style.setProperty('--hero-preview-scale', '1')
	node.style.setProperty('--hero-preview-glow-x', '50%')
	node.style.setProperty('--hero-preview-glow-y', '50%')
	node.style.setProperty('--hero-preview-glow-opacity', '0')
	node.dataset.active = 'false'
}

function applyPreviewStyles(node: HTMLDivElement, point: PointerPosition) {
	const rotateY = (point.x - 0.5) * MAX_ROTATION * 2
	const rotateX = (0.5 - point.y) * MAX_ROTATION * 2

	node.style.setProperty('--hero-preview-rotate-x', `${rotateX.toFixed(2)}deg`)
	node.style.setProperty('--hero-preview-rotate-y', `${rotateY.toFixed(2)}deg`)
	node.style.setProperty('--hero-preview-scale', ACTIVE_SCALE.toFixed(3))
	node.style.setProperty(
		'--hero-preview-glow-x',
		`${(point.x * 100).toFixed(2)}%`,
	)
	node.style.setProperty(
		'--hero-preview-glow-y',
		`${(point.y * 100).toFixed(2)}%`,
	)
	node.style.setProperty('--hero-preview-glow-opacity', '1')
	node.dataset.active = 'true'
}

export function HeroPreviewCard() {
	const shellRef = useRef<HTMLDivElement>(null)
	const frameRef = useRef<number | null>(null)
	const latestPointRef = useRef<PointerPosition | null>(null)

	useEffect(() => {
		const node = shellRef.current
		if (node) {
			resetPreviewStyles(node)
		}

		return () => {
			if (frameRef.current !== null) {
				window.cancelAnimationFrame(frameRef.current)
			}
		}
	}, [])

	const flushPointerPosition = () => {
		frameRef.current = null

		const node = shellRef.current
		const point = latestPointRef.current

		if (!node || !point) {
			return
		}

		applyPreviewStyles(node, point)
	}

	const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (event.pointerType === 'touch') {
			return
		}

		const node = shellRef.current
		if (!node) {
			return
		}

		const rect = node.getBoundingClientRect()
		const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
		const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1)

		latestPointRef.current = { x, y }

		if (frameRef.current === null) {
			frameRef.current = window.requestAnimationFrame(flushPointerPosition)
		}
	}

	const handlePointerLeave = () => {
		latestPointRef.current = null

		if (frameRef.current !== null) {
			window.cancelAnimationFrame(frameRef.current)
			frameRef.current = null
		}

		const node = shellRef.current
		if (node) {
			resetPreviewStyles(node)
		}
	}

	return (
		<Paper
			ref={shellRef}
			radius={32}
			p='lg'
			withBorder
			className='hero-preview-shell'
			style={{
				borderColor: 'rgba(255,255,255,0.08)',
				background:
					'linear-gradient(180deg, rgba(25,20,16,0.92) 0%, rgba(15,12,9,0.98) 100%)',
				boxShadow: '0 38px 110px rgba(0,0,0,0.4)',
			}}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
		>
			<div className='hero-preview-content'>
				<div className='mb-6 flex items-center gap-3 justify-between max-[480px]:flex-col max-[480px]:items-start'>
					<div>
						<Text size='sm' fw={700} style={{ color: '#f4af25' }}>
							{sectionContent.previewEyebrow}
						</Text>
						<Title order={3} className='text-white'>
							{sectionContent.previewTitle}
						</Title>
					</div>
					<Group gap='xs'>
						<Badge radius='xl' variant='light' color='orange'>
							Dashboard
						</Badge>
						<Badge radius='xl' variant='light' color='yellow'>
							{sectionContent.previewTag}
						</Badge>
					</Group>
				</div>
				<DashboardPreview />
			</div>
		</Paper>
	)
}
