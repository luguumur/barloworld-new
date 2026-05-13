"use client";
import { useState } from "react";
import Link from "next/link";
import type { ProductRow } from "@/actions/product";
import PageSidebar from "../Common/PageSidebar";
import { resolveImageUrl } from "@/libs/resolveImageUrl";
import { AttributeValue } from "@prisma/client";
import { useTranslations } from "next-intl";

type Tab = "overview" | "specs";
type MediaTab = "image" | "vpt";
type DetailTab = "specs" | "features" | "compare";

type Props = {
	product: ProductRow;
	lang?: "mn" | "en";
	categoryProducts?: ProductRow[];
};

const AttributeComparisonTable: React.FC<{ products: ProductRow[] }> = ({
	products,
}) => {
	const combinedAttributes = new Map<string, AttributeValue[]>();

	const addAttributes = (
		attributes: AttributeValue[] | any[] = [],
		productId: string
	) => {
		attributes.forEach((attr) => {
			const key = attr.attributeId;
			if (!combinedAttributes.has(key)) {
				combinedAttributes.set(key, []);
			}
			combinedAttributes.get(key)!.push({ ...attr, productId: productId });
		});
	};

	products.forEach((product) =>
		addAttributes(product.attributeValues || [], product.id)
	);

	return (
		<>
			<h1>Compare</h1>
			<table>
				<thead>
					<tr>
						<th>&nbsp;</th>
						{products.map((product) => (
							<th key={product.id} className='text-center'>
								<span>CATERPILLAR</span>
								<br />
								<span className='scl-font-bold'>{product.name}</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody className='scl-section'>
					<tr>
						<th colSpan={99} className='scl-expanded'>
							<span>Driveline</span>
						</th>
					</tr>
				</tbody>
				<tbody className='data'>
					{Array.from(combinedAttributes.values()).map((attrs: any) => (
						<tr key={attrs[0].attributeId} className='scl-data-row'>
							<th className='scl-modelAttrData'>
								{attrs[0].attribute?.name || "-"}
							</th>
							{products.map((product) => (
								<td className='scl-attrval text-center' key={product.id}>
									{product.attributeValues?.find(
										(a) => a.attributeId === attrs[0].attributeId
									)?.string_value || "-"}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

type MachineCheckboxProps = {
	machine: ProductRow;
	isSelected: boolean;
	isEnabled: boolean;
	onCheckboxChange: (id: string, checked: boolean) => void;
};
const MachineCheckbox: React.FC<MachineCheckboxProps> = ({
	machine,
	isSelected,
	isEnabled,
	onCheckboxChange,
}) => {
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onCheckboxChange(machine.id, e.target.checked);
	};
	return (
		<li
			className={`${isSelected ? "scl-selected" : ""} ${
				!isEnabled ? "scl-locked" : ""
			}`}
		>
			<input
				type='checkbox'
				checked={isSelected}
				onChange={handleCheckboxChange}
				disabled={!isEnabled}
				id={`sclCbxModel${machine.id}`}
			/>
			<label htmlFor={`sclCbxModel${machine.id}`}>
				<span>{machine.name}</span>
			</label>
		</li>
	);
};

export default function ProductDetail({
	product,
	lang = "en",
	categoryProducts = [],
}: Props) {
	const t = useTranslations("MenuData");
	const [mediaTab, setMediaTab] = useState<MediaTab>("image");
	const [mainImage, setMainImage] = useState({
		preview:
			"https://s7d2.scene7.com/is/image/Caterpillar/CM20230404-5ed1c-534f4?wid=700&hei=467&op_sharpen=1&qlt=100",
		full: "https://s7d2.scene7.com/is/image/Caterpillar/CM20230404-5ed1c-534f4",
	});
	const [activeThumbIndex, setActiveThumbIndex] = useState(0);
	const [detailTab, setDetailTab] = useState<DetailTab>("specs");

	const name = lang === "mn" ? product.name : product.name_en;
	const description =
		lang === "mn" ? product.description : product.description_en;
	const img = resolveImageUrl(product.img_path, null);
	const brochureUrl = resolveImageUrl(product.brochure_path, null);

	const grouped = product.attributeValues?.reduce<
		Record<string, { groupName: string; attrs: typeof product.attributeValues }>
	>((acc, av) => {
		const gid = av!.groupId;
		if (!acc[gid])
			acc[gid] = {
				groupName: lang === "mn" ? av!.group.name : av!.group.name_en,
				attrs: [],
			};
		acc[gid].attrs!.push(av);
		return acc;
	}, {});

	const hasSpecs = grouped && Object.keys(grouped).length > 0;

	const siblingProducts = categoryProducts.filter((p) => p.id !== product.id);
	const sortedSiblings = [product, ...siblingProducts];

	const [selections, setSelections] = useState<Record<string, boolean>>(() => {
		const init: Record<string, boolean> = { [product.id]: true };
		return init;
	});
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const handleCheckboxChange = (id: string, checked: boolean) => {
		setSelections((prev) => ({ ...prev, [id]: checked }));
	};

	const getSelectedModels = (): ProductRow[] => {
		const selected = sortedSiblings.filter((p) => selections[p.id]);
		return selected.slice(0, 5);
	};

	return (
		<article className='page-body container'>
			<div className='row'>
				<PageSidebar />
				<main className='page-content col-md-9'>
					<div className='row'>
						<div className='col-xxs-12'>
							<a
								className='js-image-popup'
								id='image-viewer'
								href={mainImage.full}
								style={{ display: mediaTab === "image" ? "block" : "none" }}
							>
								<img
									src={resolveImageUrl(product.img_path, "")}
									alt={name}
									className='img-responsive entered lazyloaded'
								/>
							</a>
							<div
								className='vpt-viewer'
								id='vpt-viewer'
								style={{ display: mediaTab === "vpt" ? "block" : "none" }}
							>
								<div id='spinset-exterior'>
									<iframe
										loading='lazy'
										src={
											mediaTab === "vpt"
												? "https://s7d2.scene7.com/s7viewers/html5/genericSpinMobile.html?serverUrl=https://s7d2.scene7.com/is/image/&config=Caterpillar/Catdotcom%20Spin%20Sets&contentRoot=https://s7d2.scene7.com/skins/&asset=Caterpillar/725%20%2805%29%20AT%20%2D%20Exterior"
												: "about:blank"
										}
										scrolling='no'
										width='600px'
										height='450px'
										style={{ width: "100%" }}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='tabs tabs--small media-tabs push-xxs--top flush-xs--top js-media-tabs'>
						<ul className='tabs__nav js-tabs'>
							<li
								className={`tab-link-main${
									mediaTab === "image" ? " active" : ""
								}`}
							>
								<a
									href='#product-photos'
									title='Photos'
									data-type='image'
									onClick={(e) => {
										e.preventDefault();
										setMediaTab("image");
									}}
								>
									<span className='icon-camera'></span>
								</a>
							</li>
							<li
								className={`tab-link-main${
									mediaTab === "vpt" ? " active" : ""
								}`}
							>
								<a
									href='#product-360s'
									title='360° Views'
									data-type='vpt'
									onClick={(e) => {
										e.preventDefault();
										setMediaTab("vpt");
									}}
								>
									<span className='icon-360'></span>
								</a>
							</li>
						</ul>
						<div className='tabs__content'>
							<div
								id='product-photos'
								className='tabs__tab'
								style={{ display: mediaTab === "image" ? "block" : "none" }}
							>
								<ul
									className='media-tabs-thumbnails js-media-thumbnail slick-initialized slick-slider'
									id='image-media-thumbnails'
								>
									<div aria-live='polite' className='slick-list'>
										<div
											className='slick-track'
											style={{
												opacity: 1,
												width: 25000,
												transform: "translate3d(-5px, 0px, 0px)",
											}}
											role='listbox'
										>
											{[
												{ thumb: "CM20230404-5ed1c-534f4", idx: 0 },
												{ thumb: "CM20220901-10d5d-8cd06", idx: 1 },
												{ thumb: "CM20220901-2c9bc-ba5fc", idx: 2 },
												{ thumb: "CM20220901-b12bf-f1dfd", idx: 3 },
												{ thumb: "CM20220901-3c7b5-dd1b4", idx: 4 },
											].map(({ thumb, idx }) => (
												<li
													key={idx}
													className={`media-tabs-thumbnail product-detail__thumbnail slick-slide slick-active${
														activeThumbIndex === idx ? " slick-current" : ""
													}`}
													tabIndex={0}
													role='option'
													aria-describedby={`slick-slide0${idx}`}
													data-slick-index={String(idx)}
													aria-hidden='false'
													onClick={() => {
														setActiveThumbIndex(idx);
														setMainImage({
															preview: `https://s7d2.scene7.com/is/image/Caterpillar/${thumb}?wid=700&hei=467&op_sharpen=1&qlt=100`,
															full: `https://s7d2.scene7.com/is/image/Caterpillar/${thumb}`,
														});
													}}
													style={{ cursor: "pointer" }}
												>
													<img
														src={`https://s7d2.scene7.com/is/image/Caterpillar/${thumb}?wid=100&hei=60&op_sharpen=1&qlt=100`}
														alt=''
														className='img-responsive entered lazyloaded'
													/>
												</li>
											))}
										</div>
									</div>
								</ul>
							</div>
							<div
								id='product-360s'
								className='tabs__tab tabs__content-panel'
								style={{ display: mediaTab === "vpt" ? "block" : "none" }}
							>
								<ul
									className='media-tabs-thumbnails js-media-thumbnail slick-initialized slick-slider'
									id='vpt-media-thumbnails'
								>
									<div aria-live='polite' className='slick-list'>
										<div
											className='slick-track'
											style={{
												opacity: 1,
												width: 20000,
												transform: "translate3d(0px, 0px, 0px)",
											}}
											role='listbox'
										>
											<li
												className='media-tabs-thumbnail product-detail__vpt text--center slick-slide slick-current slick-active'
												tabIndex={0}
												role='option'
												aria-describedby='slick-slide10'
												data-slick-index='0'
												aria-hidden='false'
											>
												<img
													width='35'
													height='35'
													src='https://thompsonmachinery.com/content/themes/thompsonmachinery/assets/img/vpts-thumb.gif'
													data-type='vpt'
													data-target='spinset-exterior'
													alt=''
													data-lazy-src='https://thompsonmachinery.com/content/themes/thompsonmachinery/assets/img/vpts-thumb.gif'
												/>
												<small className='media-tabs-thumbnails__label pt-3 font-noto'>
													Exterior View
												</small>
											</li>
										</div>
									</div>
								</ul>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-xs-6 col-md-7'>
							<div className='product__overview'>&nbsp;</div>
						</div>
						<div className='col-xs-6 col-md-5'>
							<a
								href='https://thompsonmachinery.com/contact-us/request-a-quote/?machine=725 Articulated Truck'
								className='btn btn-primary btn-block'
							>
								Request a Quote
							</a>
							<ul className='product__actions'>
								<li>
									{brochureUrl && (
										<ul className='product__actions roboto'>
											<li>
												<a
													href={`https://webapi.barloworld.mn/file/${brochureUrl}`}
													target='_blank'
													rel='nofollow'
												>
													<span className='icon-pdf-01'></span>{" "}
													{t("downloadbrochure")}
												</a>
											</li>
										</ul>
									)}
								</li>
								<li>
									<a href='mailto:?subject=Thompson Cat: 725 Articulated Truck&amp;body=https://thompsonmachinery.com/new-equipment/machines/articulated-trucks/725-articulated-truck/'>
										<span className='icon-share'></span> Share{" "}
									</a>
								</li>
								<li className='hidden-xxs hidden-xs hidden-sm'>
									<a href='#' onClick={() => window.print()}>
										<span className='icon-print'></span> Print{" "}
									</a>
								</li>
							</ul>
						</div>
					</div>
					<section className='product__details tabs'>
						<div className='tabs__nav-wrapper clearfix'>
							<ul className='tabs__nav cleafix js-tabs '>
								<li
									className={`tab-link${
										detailTab === "specs" ? " active" : ""
									}`}
								>
									<a
										href='#specs'
										onClick={(e) => {
											e.preventDefault();
											setDetailTab("specs");
										}}
									>
										Specifications
									</a>
								</li>
								<li
									className={`tab-link${
										detailTab === "features" ? " active" : ""
									}`}
								>
									<a
										href='#features'
										onClick={(e) => {
											e.preventDefault();
											setDetailTab("features");
										}}
									>
										Benefits and Features
									</a>
								</li>
								<li
									className={`tab-link${
										detailTab === "compare" ? " active" : ""
									}`}
								>
									<a
										href='#compare'
										onClick={(e) => {
											e.preventDefault();
											setDetailTab("compare");
										}}
									>
										Compare Models
									</a>
								</li>
							</ul>
						</div>
						<div className='tabs__content'>
							{hasSpecs && (
								<div
									className={`product__specs tabs__tab${
										detailTab === "specs" ? " active" : ""
									}`}
									id='specs'
									style={{ display: detailTab === "specs" ? "block" : "none" }}
								>
									<div className='specs specs--list'>
										{Object.values(grouped).map(
											(group: any) =>
												group.groupName !== "FILTERS" && (
													<div key={group.groupName}>
														<h4>{group.groupName}</h4>
														{group.attrs.map((attr: any) => (
															<dl key={attr.id} className='clearfix flush--top'>
																<div className='specs__row clearfix'>
																	<dt>{attr.attribute.name}</dt>
																	<dd>{attr.string_value}</dd>
																</div>
															</dl>
														))}
													</div>
												)
										)}
									</div>
								</div>
							)}
							<div
								className={`product__features tabs__tab${
									detailTab === "features" ? " active" : ""
								}`}
								id='features'
								style={{ display: detailTab === "features" ? "block" : "none" }}
							>
								{description}
							</div>
							<div
								className={`tabs__tab${
									detailTab === "compare" ? " active" : ""
								}`}
								id='compare'
								style={{ display: detailTab === "compare" ? "block" : "none" }}
							>
								<div className='specCheckLite'>
									<div className='scl-screen' id='sclMachineSelectionScreen'>
										<button
											className='scl-button scl-button-compare'
											onClick={toggleVisibility}
										>
											{isVisible ? "Select" : "Compare"}
										</button>
									</div>
									{isVisible ? (
										<div id='sclComparisonScreen' className='scl-screen'>
											<AttributeComparisonTable
												products={getSelectedModels()}
											/>
										</div>
									) : (
										<div id='sclMachineSelectionScreen' className='scl-screen'>
											<h1>Compare Models</h1>
											<h2>Select Models to Compare (Maximum of 5)</h2>
											<div id='sclMachineSelection'>
												<div
													id='sclInternalMachineSelectPane'
													className='scl-machineSelectPane'
												>
													<div className='scl-paneHead'>
														<ul>
															{sortedSiblings.map((item) => (
																<div key={item.id}>
																	<MachineCheckbox
																		machine={item}
																		isSelected={!!selections[item.id]}
																		isEnabled={item.id !== product.id}
																		onCheckboxChange={handleCheckboxChange}
																	/>
																</div>
															))}
														</ul>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</article>
	);
}
