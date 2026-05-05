"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const equipmentTypes = [
	"Excavator / Экскаватор",
	"Wheel Loader / Дугуйт ачигч",
	"Bulldozer / Бульдозер",
	"Motor Grader / Автогрейдер",
	"Backhoe Loader / Бэкхоу ачигч",
	"Skid Steer / Бобкат",
	"Compactor / Тэгшлэгч",
	"Truck / Самосвал",
	"Generator / Генератор",
	"Work Tool / Ажлын хэрэгсэл",
];

export default function EquipmentSearch() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [type, setType] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (query.trim()) params.set("search", query.trim());
		if (type) params.set("search", type.split(" / ")[0]);
		router.push(`/products${params.toString() ? `?${params}` : ""}`);
	};

	return (
		<section className='bg-[#1e293b] py-10'>
			<div className='container mx-auto px-4 sm:px-8 xl:px-0'>
				<p className='mb-4 text-center font-satoshi text-lg font-bold text-white sm:text-xl'>
					Find the Right Equipment —{" "}
					<span className='text-primary'>Search Our Inventory</span>
				</p>

				<form
					onSubmit={handleSearch}
					className='flex flex-col gap-3 sm:flex-row sm:items-center'
				>
					<div className='flex-1'>
						<input
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='Search by name, model, or keyword…'
							className='h-12 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-white/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30'
						/>
					</div>

					<div className='w-full sm:w-64'>
						<select
							value={type}
							onChange={(e) => setType(e.target.value)}
							className='h-12 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/30'
						>
							<option value='' className='bg-[#1e293b]'>
								All Equipment Types
							</option>
							{equipmentTypes.map((t) => (
								<option key={t} value={t} className='bg-[#1e293b]'>
									{t}
								</option>
							))}
						</select>
					</div>

					<button
						type='submit'
						className='h-12 shrink-0 rounded-lg bg-primary px-8 font-satoshi font-bold text-black transition hover:bg-primary-dark'
					>
						Search
					</button>
				</form>
			</div>
		</section>
	);
}
