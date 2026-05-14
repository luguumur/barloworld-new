"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TeamAction from "./TeamAction";
import { TeamRow, reorderTeams } from "@/actions/team";

function resolveImage(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

function SortableRow({ team }: { team: TeamRow }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: team.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		background: isDragging ? "#f9f9f9" : undefined,
	};

	const src = resolveImage(team.image);

	return (
		<tr
			ref={setNodeRef}
			style={style}
			className='border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark'
		>
			{/* drag handle */}
			<td className='w-8 px-3 py-4 sm:pl-7.5'>
				<button
					{...attributes}
					{...listeners}
					className='cursor-grab touch-none text-body/40 hover:text-body active:cursor-grabbing dark:text-gray-5'
					title='Drag to reorder'
				>
					<svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
						<circle cx='9' cy='6' r='1.5' />
						<circle cx='15' cy='6' r='1.5' />
						<circle cx='9' cy='12' r='1.5' />
						<circle cx='15' cy='12' r='1.5' />
						<circle cx='9' cy='18' r='1.5' />
						<circle cx='15' cy='18' r='1.5' />
					</svg>
				</button>
			</td>

			<td className='p-4 text-left'>
				{src ? (
					<div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-1 dark:bg-white/5'>
						<Image
							src={src}
							alt={team.name}
							fill
							className='object-cover'
							sizes='48px'
							unoptimized
						/>
					</div>
				) : (
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5'>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
							<path
								d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				)}
			</td>

			<td className='p-4 text-left'>
				<p className='font-medium text-dark dark:text-white'>{team.name}</p>
				<p className='text-sm text-body dark:text-gray-5'>{team.name_en}</p>
				<span className='block text-xs text-body/70 md:hidden'>{team.pos}</span>
				<span className='block lsm:hidden'>
					<TeamAction team={team} />
				</span>
			</td>

			<td className='hidden p-4 text-left md:table-cell'>
				<p className='text-sm text-dark dark:text-white'>{team.pos}</p>
				<p className='text-xs text-body dark:text-gray-5'>{team.pos_en}</p>
			</td>

			<td className='hidden p-4 text-left text-sm text-body dark:text-gray-5 lg:table-cell'>
				{team.order}
			</td>

			<td className='hidden p-4 text-right lsm:table-cell sm:pr-7.5'>
				<TeamAction team={team} />
			</td>
		</tr>
	);
}

export default function TeamListTable({ teams }: { teams: TeamRow[] }) {
	const [items, setItems] = useState(teams);
	const [saving, setSaving] = useState(false);

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = items.findIndex((t) => t.id === active.id);
		const newIndex = items.findIndex((t) => t.id === over.id);
		const reordered = arrayMove(items, oldIndex, newIndex);
		setItems(reordered);

		setSaving(true);
		try {
			await reorderTeams(reordered.map((t) => t.id));
			toast.success("Order saved");
		} catch {
			toast.error("Failed to save order");
			setItems(items);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div>
			{saving && (
				<p className='mb-2 text-right text-xs text-body dark:text-gray-5'>
					Saving order…
				</p>
			)}
			<DndContext
				id='team-list-dnd'
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
					<table className='w-full'>
						<thead>
							<tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
								<th className='w-8 px-3 py-5 sm:pl-7.5' />
								<th className='w-16 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5'>
									Photo
								</th>
								<th className='min-w-[180px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5'>
									Name
								</th>
								<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
									Position
								</th>
								<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lg:table-cell'>
									Order
								</th>
								<th className='hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
									Action
								</th>
							</tr>
						</thead>
						<SortableContext
							items={items.map((t) => t.id)}
							strategy={verticalListSortingStrategy}
						>
							<tbody>
								{items.map((team) => (
									<SortableRow key={team.id} team={team} />
								))}
							</tbody>
						</SortableContext>
					</table>
				</div>
			</DndContext>
		</div>
	);
}
