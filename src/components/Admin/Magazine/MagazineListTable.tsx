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
import MagazineAction from "./MagazineAction";
import ImagePlaceholderSvg from "@/components/Common/ImagePlaceholderSvg";
import { MagazineRow, reorderMagazines } from "@/actions/magazine";

function imageSrc(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

function SortableRow({ magazine }: { magazine: MagazineRow }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({ id: magazine.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		background: isDragging ? "#f9f9f9" : undefined,
	};

	const src = imageSrc(magazine.image);

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

			<td className='p-4 text-left sm:pl-7.5'>
				{src ? (
					<div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-1 dark:bg-white/5'>
						<Image src={src} alt='' fill className='object-cover' sizes='48px' />
					</div>
				) : (
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5'>
						<ImagePlaceholderSvg className='h-6 w-6' />
					</div>
				)}
			</td>

			<td className='p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5'>
				<span className='line-clamp-2'>{magazine.title}</span>
				<span className='block text-sm text-body/80 md:hidden'>
					{magazine.number ? `#${magazine.number}` : "—"} {magazine.date ?? ""}
				</span>
				<span className='block xl:hidden'>
					{magazine.url ? (
						<a href={magazine.url} target='_blank' rel='noopener noreferrer' className='text-sm text-primary hover:underline'>Link</a>
					) : null}
				</span>
				<span className='block sm:hidden'>
					Created: {new Date(magazine.createdAt).toLocaleDateString()}
				</span>
				<span className='block lsm:hidden'>
					<MagazineAction magazine={magazine} />
				</span>
			</td>

			<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 md:table-cell'>
				{magazine.number ?? "—"}
			</td>

			<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 md:table-cell'>
				{magazine.date ?? "—"}
			</td>

			<td className='hidden max-w-[180px] truncate p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 xl:table-cell'>
				{magazine.url ? (
					<a href={magazine.url} target='_blank' rel='noopener noreferrer' className='block truncate text-primary hover:underline'>
						{magazine.url}
					</a>
				) : "—"}
			</td>

			<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 sm:table-cell'>
				{new Date(magazine.createdAt).toLocaleDateString()}
			</td>

			<td className='hidden p-4 text-right text-base tracking-[-.16px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
				<MagazineAction magazine={magazine} />
			</td>
		</tr>
	);
}

export default function MagazineListTable({ magazines }: { magazines: MagazineRow[] }) {
	const router = useRouter();
	const [items, setItems] = useState(magazines);
	const [saving, setSaving] = useState(false);

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = items.findIndex((m) => m.id === active.id);
		const newIndex = items.findIndex((m) => m.id === over.id);
		const reordered = arrayMove(items, oldIndex, newIndex);
		setItems(reordered);

		setSaving(true);
		try {
			await reorderMagazines(reordered.map((m) => m.id));
			toast.success("Order saved");
			router.refresh();
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
				<p className='mb-2 text-right text-xs text-body dark:text-gray-5'>Saving order…</p>
			)}
			<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
				<table className='w-full'>
					<thead>
						<tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
							<th className='w-8 px-3 py-5 sm:pl-7.5' />
							<th className='w-16 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5'>Image</th>
							<th className='min-w-[180px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5'>Title</th>
							<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>Number</th>
							<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>Date</th>
							<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 xl:table-cell'>URL</th>
							<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:table-cell'>Created</th>
							<th className='hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>Action</th>
						</tr>
					</thead>
					<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
						<SortableContext items={items.map((m) => m.id)} strategy={verticalListSortingStrategy}>
							<tbody>
								{items.map((magazine) => (
									<SortableRow key={magazine.id} magazine={magazine} />
								))}
							</tbody>
						</SortableContext>
					</DndContext>
				</table>
			</div>
		</div>
	);
}
