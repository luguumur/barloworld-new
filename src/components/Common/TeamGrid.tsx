import { getTeamsPublic } from "@/actions/team";
import { cookies } from "next/headers";

function resolveImage(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

export default async function TeamGrid() {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const members = await getTeamsPublic();

	if (!members.length) return null;

	return (
		<section className='py-12'>
			<div className='container'>
				<div className='row'>
					{members.map((member) => {
						const src = resolveImage(member.image);
						const name = lang === "mn" ? member.name : member.name_en;
						const pos = lang === "mn" ? member.pos : member.pos_en;

						return (
							<div key={member.id} className='col-sm-6 col-md-4 col-lg-3 mb-8'>
								<div className='flex flex-col items-center text-center'>
									<div className='relative mb-4 h-40 w-40 overflow-hidden rounded-full bg-gray-200'>
										{src ? (
											<img
												src={src}
												alt={name}
												className='h-full w-full object-cover'
											/>
										) : (
											<div className='flex h-full w-full items-center justify-center text-gray-400'>
												<svg width='48' height='48' viewBox='0 0 24 24' fill='none'>
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
									</div>
									<h3 className='mb-1 text-base font-bold text-dark'>{name}</h3>
									<p className='text-sm text-gray-500'>{pos}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
