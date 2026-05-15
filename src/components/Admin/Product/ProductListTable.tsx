"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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
import ProductAction from "./ProductAction";
import ImagePlaceholderSvg from "@/components/Common/ImagePlaceholderSvg";
import { reorderProducts } from "@/actions/product";

type Product = {
	id: string;
	name: string;
	name_en: string;
	img_path: string | null;
	product_order: number | null;
	product_types: string | null;
	status: string;
	createdAt: Date;
	category?: { name: string; name_en: string } | null;
};

function imageSrc(path: string | null): string | null {
	if (!path?.trim()) return null;
	if (path.startsWith("http")) return path;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${path}` : null;
}

function SortableRow({ product }: { product: Product }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: product.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		background: isDragging ? "#f9f9f9" : undefined,
	};

	const src = imageSrc(product.img_path);

	return (
		<tr
			ref={setNodeRef}
			style={style}
			className='border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark'
		>
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
						<Image
							src={src}
							alt=''
							fill
							className='object-cover'
							sizes='48px'
						/>
					</div>
				) : (
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5'>
						<ImagePlaceholderSvg className='h-6 w-6' />
					</div>
				)}
			</td>
			<td className='p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5'>
				<span className='line-clamp-2'>{product.name}</span>
				<span className='block text-sm text-body/80 md:hidden'>
					{product.category?.name ?? "—"}
				</span>
				<span className='block sm:hidden'>
					{new Date(product.createdAt).toLocaleDateString()}
				</span>
				<span className='block lsm:hidden'>
					<ProductAction product={product} />
				</span>
			</td>
			<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 md:table-cell'>
				{product.category?.name ?? "—"}
			</td>
			<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 lg:table-cell'>
				{product.product_types ?? "—"}
			</td>
			<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 sm:table-cell'>
				{product.status}
			</td>
			<td className='hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 sm:table-cell'>
				{new Date(product.createdAt).toLocaleDateString()}
			</td>
			<td className='hidden p-4 text-right text-base tracking-[-.16px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
				<ProductAction product={product} />
			</td>
		</tr>
	);
}

export default function ProductListTable({
	products,
}: {
	products: Product[];
}) {
	const [items, setItems] = useState(products);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setItems(products);
	}, [products]);
	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const oldIndex = items.findIndex((p) => p.id === active.id);
		const newIndex = items.findIndex((p) => p.id === over.id);
		const reordered = arrayMove(items, oldIndex, newIndex);
		setItems(reordered);
		setSaving(true);
		try {
			await reorderProducts(reordered.map((p) => p.id));
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
				id='product-list-dnd'
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
					<table className='w-full'>
						<thead>
							<tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
								<th className='w-8 px-3 py-5 sm:pl-7.5' />
								<th className='w-16 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5'>
									Image
								</th>
								<th className='min-w-[140px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5'>
									Name
								</th>
								<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell'>
									Category
								</th>
								<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lg:table-cell'>
									Type
								</th>
								<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:table-cell'>
									Status
								</th>
								<th className='hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:table-cell'>
									Created
								</th>
								<th className='hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5'>
									Action
								</th>
							</tr>
						</thead>
						<SortableContext
							items={items.map((p) => p.id)}
							strategy={verticalListSortingStrategy}
						>
							<tbody>
								{items.map((product) => (
									<SortableRow key={product.id} product={product} />
								))}
							</tbody>
						</SortableContext>
					</table>
				</div>
			</DndContext>
		</div>
	);
}
