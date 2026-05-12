import type { NewsRow } from "@/actions/news";
import Image from "next/image";
import Link from "next/link";

type Props = {
	news?: NewsRow[];
	lang?: "mn" | "en";
};

const Blog = ({ news = [], lang = "en" }: Props) => {
	if (!news.length) return null;

	return (
		<section
			className='overflow-hidden pb-17.5 lg:pb-22.5 xl:pb-27.5'
			id='blog'
		>
			<div className='container mx-auto w-full px-4 sm:px-8 xl:px-0'>
				<div className='home-deals-header mb-10'>
					<h2>News & Blog</h2>
				</div>
				<div className='grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-4'>
					{news.slice(0, 4).map((item) => {
						const title = lang === "mn" ? item.title : item.title_en;
						const subtitle = lang === "mn" ? item.subtitle : item.subtitle_en;
						const imageUrl = item.thumbnail
							? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.thumbnail}`
							: null;

						return (
							<article
								key={item.id}
								className='group overflow-hidden rounded-[15px] bg-white shadow-dropdown dark:bg-gray-dark'
							>
								{imageUrl && (
									<Link
										href={`/news/${item.id}`}
										className='block overflow-hidden'
									>
										<Image
											src={imageUrl}
											alt={title}
											className='w-full duration-300 ease-in group-hover:scale-105'
											width={500}
											height={300}
										/>
									</Link>
								)}
								<div className='px-6 py-7'>
									<p className='mb-3 text-sm text-gray-500 dark:text-gray-5'>
										{new Date(item.createdAt)
											.toDateString()
											.split(" ")
											.slice(1)
											.join(" ")}
									</p>
									<h3 className='mb-4 font-satoshi text-custom-2xl font-bold -tracking-[0.3px] text-black hover:text-primary dark:text-white'>
										<Link href={`/news/${item.id}`}>{title}</Link>
									</h3>
									{subtitle && (
										<p className='w-full max-w-[272px] dark:text-gray-5'>
											{subtitle.substring(0, 80)}
										</p>
									)}
								</div>
							</article>
						);
					})}
				</div>
				<div className='mt-10'>
					<Link href='/news' className='btn btn-primary'>
						MORE NEWS
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Blog;
