"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import {
	deleteHomeCard,
	reorderHomeCards,
	HomeCardRow,
} from "@/actions/homeMain";

function imageSrc(imgPath: string | null): string | null {
	if (!imgPath?.trim()) return null;
	if (imgPath.startsWith("http")) return imgPath;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${imgPath}` : null;
}

function SortableRow({ card }: { card: HomeCardRow }) {
	const router = useRouter();
	const [showDelete, setShowDelete] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: card.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		background: isDragging ? "#f9f9f9" : undefined,
	};

	const handleDelete = async () => {
		setDeleting(true);
		try {
			await deleteHomeCard(card.id);
			toast.success("Card deleted");
			router.refresh();
			setShowDelete(false);
		} catch {
			toast.error("Failed to delete");
		} finally {
			setDeleting(false);
		}
	};

	const src = imageSrc(card.image);

	return (
		<>
			<tr
				ref={setNodeRef}
				style={style}
				className='border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark'
			>
				{/* drag handle */}
				<td className='w-8 p-3 sm:pl-6'>
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

				<td className='p-3'>
					<div className='h-12 w-16 overflow-hidden rounded-lg border border-stroke dark:border-stroke-dark'>
						{src ? (
							<img
								src={src}
								alt={card.title_en}
								className='h-full w-full object-cover'
							/>
						) : (
							<div className='flex h-full w-full items-center justify-center bg-gray-1 text-xs text-body/40 dark:bg-white/5'>
								No img
							</div>
						)}
					</div>
				</td>

				<td className='p-3'>
					<p className='font-medium text-dark dark:text-white'>
						{card.title_en}
					</p>
					<p className='text-sm text-body dark:text-gray-5'>{card.title}</p>
				</td>

				<td className='hidden p-3 text-sm text-body dark:text-gray-5 md:table-cell'>
					{card.url}
				</td>

				<td className='hidden p-3 text-center text-sm text-body dark:text-gray-5 sm:table-cell'>
					{card.order}
				</td>

				<td className='p-3 text-right sm:pr-6'>
					<div className='flex items-center justify-end gap-2'>
						<Link
							href={`/admin/home-main/cards/${card.id}/edit`}
							className='flex h-9 items-center rounded-lg bg-primary px-3 text-sm text-white hover:bg-primary-dark'
						>
							Edit
						</Link>
						<button
							onClick={() => setShowDelete(true)}
							className='flex h-9 w-9 items-center justify-center rounded-lg bg-red-light-5 text-red hover:bg-red hover:text-white dark:bg-red/10 dark:hover:bg-red'
						>
							<svg width='18' height='18' viewBox='0 0 21 20' fill='none'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M9.53 1.875h2.82c.37 0 .71.17.93.46.07.13.12.28.18.45l.09.28c.15.4.53.67.96.69h2.5c.35 0 .63.28.63.625s-.28.625-.63.625H3.86a.625.625 0 0 1 0-1.25h2.5c.43-.02.81-.29.96-.69l.09-.28c.06-.17.11-.32.18-.45.22-.29.56-.46.93-.46Z'
									fill='currentColor'
								/>
								<path
									d='M5.87 7.042a.625.625 0 0 0-1.247.083l.387 5.793c.07 1.069.13 1.932.264 2.61.14.704.38 1.292.872 1.753.493.461 1.096.66 1.808.753.685.09 1.55.09 2.622.09h.742c1.071 0 1.937 0 2.622-.09.712-.093 1.315-.292 1.808-.753.493-.461.731-1.049.872-1.752.134-.679.193-1.542.264-2.61l.387-5.794a.625.625 0 0 0-1.247-.083l-.384 5.749c-.075 1.123-.128 1.905-.245 2.493-.114.57-.272.872-.5 1.085-.228.213-.54.351-1.116.427-.594.077-1.378.078-2.503.078h-.635c-1.125 0-1.91-.001-2.503-.078-.577-.076-.888-.214-1.116-.427-.228-.213-.386-.515-.5-1.085-.117-.588-.17-1.37-.245-2.493L5.87 7.042Z'
									fill='currentColor'
								/>
							</svg>
						</button>
					</div>
				</td>
			</tr>

			<DeleteModal
				showDeleteModal={showDelete}
				setShowDeleteModal={setShowDelete}
				deleteText='Remove Card'
				handleDelete={handleDelete}
				loading={deleting}
			/>
		</>
	);
}

export default function HomeCardList({ cards }: { cards: HomeCardRow[] }) {
	const [items, setItems] = useState(cards);
	const [saving, setSaving] = useState(false);

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = items.findIndex((c) => c.id === active.id);
		const newIndex = items.findIndex((c) => c.id === over.id);
		const reordered = arrayMove(items, oldIndex, newIndex);
		setItems(reordered);

		setSaving(true);
		try {
			await reorderHomeCards(reordered.map((c) => c.id));
			toast.success("Order saved");
		} catch {
			toast.error("Failed to save order");
			setItems(items); // revert
		} finally {
			setSaving(false);
		}
	};

	return (
		<div>
			<div className='mb-4 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<h3 className='font-satoshi font-semibold text-dark dark:text-white'>
						Image Cards ({items.length}/6)
					</h3>
					{saving && (
						<span className='text-xs text-body dark:text-gray-5'>Saving…</span>
					)}
				</div>
				<Link
					href='/admin/home-main/cards/new'
					className='flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm text-white hover:bg-primary-dark'
				>
					+ Add card
				</Link>
			</div>

			{items.length ? (
				<div className='overflow-hidden rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
					<DndContext
					id='home-card-list-dnd'
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-stroke dark:border-stroke-dark'>
								<th className='w-8 p-3 sm:pl-6' />
								<th className='p-3 text-left text-sm font-medium text-body dark:text-gray-5'>
									Image
								</th>
								<th className='p-3 text-left text-sm font-medium text-body dark:text-gray-5'>
									Title
								</th>
								<th className='hidden p-3 text-left text-sm font-medium text-body dark:text-gray-5 md:table-cell'>
									URL
								</th>
								<th className='hidden p-3 text-center text-sm font-medium text-body dark:text-gray-5 sm:table-cell'>
									Order
								</th>
								<th className='p-3 text-right text-sm font-medium text-body dark:text-gray-5 sm:pr-6'>
									Action
								</th>
							</tr>
						</thead>
						<SortableContext
							items={items.map((c) => c.id)}
							strategy={verticalListSortingStrategy}
						>
							<tbody>
								{items.map((c) => (
									<SortableRow key={c.id} card={c} />
								))}
							</tbody>
						</SortableContext>
					</table>
				</DndContext>
				</div>
			) : (
				<div className='rounded-10 bg-white py-12 text-center shadow-1 dark:bg-gray-dark'>
					<p className='text-body dark:text-gray-5'>
						No cards yet. Add up to 6.
					</p>
				</div>
			)}
		</div>
	);
}
