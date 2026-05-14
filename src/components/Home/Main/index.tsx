import { cookies } from "next/headers";
import { getHomeContent, getHomeCards } from "@/actions/homeMain";
import { DEFAULT_CONTENT } from "@/actions/homeMainDefaults";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

export default async function Main() {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const [raw, cards] = await Promise.all([getHomeContent(), getHomeCards()]);
	const c = raw ?? { ...DEFAULT_CONTENT, id: "" };

	const titleBefore = lang === "mn" ? c.titleBefore : c.titleBefore_en;
	const titleMain = lang === "mn" ? c.titleMain : c.titleMain_en;
	const description = lang === "mn" ? c.description : c.description_en;
	const btnText = lang === "mn" ? c.btnText : c.btnText_en;

	return (
		<section className='image-button'>
			<div className='image-button-graphics-right hidden-xs-down'>
				<img
					width='585'
					height='283'
					src='https://thompsonmachinery.com/content/uploads/2021/11/graphics4.png'
					className='img-responsive entered lazyloaded'
					alt=''
				/>
			</div>
			<div className='image-button-graphics-left hidden-sm-down'>
				<img
					width='455'
					height='220'
					src='https://thompsonmachinery.com/content/uploads/2021/11/graphics5.png'
					className='img-responsive entered lazyloaded'
					alt=''
				/>
			</div>

			<div className='container'>
				<div className='row'>
					{/* Left panel */}
					<div className='col-md-5'>
						<div className='image-button-left-panel'>
							<h2>
								<span>{titleBefore}</span> {titleMain}
							</h2>
							{description && (
								<div dangerouslySetInnerHTML={{ __html: description }} />
							)}
							<a href={c.btnUrl} className='btn btn-primary'>
								{btnText}
							</a>
						</div>
					</div>

					{/* Right panel — image cards */}
					<div className='col-md-7'>
						<div className='image-button-right-panel'>
							<div className='row js-image-button' role='toolbar'>
								{cards.map((card, i) => {
									const title = lang === "mn" ? card.title : card.title_en;
									return (
										<div
											key={card.id}
											className='col-md-4 col-sm-6'
											role='option'
											aria-describedby={`slide-${i}`}
										>
											<div className='image-button-item'>
												<a href={card.url} target='_self'>
													<img
														src={resolveImg(card.image) || undefined}
														className='img-responsive entered lazyloaded'
														alt={title}
														loading='lazy'
													/>
													<div className='image-button-overlay'>
														<div className='image-button-overlay-content'>
															<div className='image-button-title'>
																<span className='image-button-title-wrap'>
																	{title}
																</span>
																<div className='image-button-title-clippy'>
																	<span className='arrow-icon'>
																		<span></span>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</a>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
