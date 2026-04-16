import Image from "next/image";
import Link from "next/link";
import { Highlight } from "react-instantsearch-dom";

type HitShape = {
	objectID?: string;
	title?: string;
	url?: string;
	type?: string;
	imageURL?: string;
};

type Props = {
	hit: HitShape;
	setSearchModalOpen: (open: boolean) => void;
	/** Database search hits — skip Algolia Highlight */
	plain?: boolean;
};

function CustomHits(props: Props) {
	const { hit, setSearchModalOpen, plain } = props;
	const href = hit?.url || hit?.objectID || "/";

	return (
		<>
			<div className='dark:border-strokedark border-t border-stroke bg-black first-of-type:border-0'>
				<div className='bg-white px-[22px] py-3.5 duration-300 hover:bg-[#F9FAFB] dark:bg-black dark:hover:bg-slate-800'>
					<Link
						onClick={() => setSearchModalOpen(false)}
						href={href}
						className='flex cursor-pointer items-center gap-4'
					>
						{hit?.imageURL && hit.imageURL.length > 1 && (
							<div
								className={`relative h-[60px] w-[106px] overflow-hidden rounded-lg `}
							>
								<Image
									src={hit.imageURL}
									alt={hit.title ?? ""}
									layout='fill'
									objectFit='cover'
									objectPosition='center'
									quality={100}
								/>
							</div>
						)}
						<div className='w-full'>
							<h3 className='text-base font-medium text-black dark:text-gray-400'>
								{plain ? (
									hit.title
								) : (
									<Highlight attribute='title' hit={hit} />
								)}
							</h3>
							<div className='text-body-color flex text-sm'>
								<div>
									{plain ? hit.type : <Highlight attribute='type' hit={hit} />}
								</div>
								<div>
									:{" "}
									{plain ? (
										hit.url
									) : (
										<Highlight attribute='url' hit={hit} />
									)}
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}
export default CustomHits;
