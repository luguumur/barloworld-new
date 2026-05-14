import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import Card from "@/components/Common/Dashboard/Card";
import { Metadata } from "next";
import LocationSettingForm from "@/components/Admin/LocationSetting/LocationSettingForm";
import { getLocationSetting } from "@/actions/locationSetting";
import { DEFAULT_LOCATION } from "@/actions/locationSettingDefaults";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Location Settings - ${process.env.SITE_NAME}`,
};

export default async function AdminLocationPage() {
	const row = await getLocationSetting();
	const initial = row
		? {
				image: row.image,
				mapEmbedUrl: row.mapEmbedUrl,
				address: row.address,
				address_en: row.address_en,
				phone: row.phone,
				email: row.email,
			}
		: DEFAULT_LOCATION;

	return (
		<>
			<Breadcrumb pageTitle='Location Settings' />
			<Card>
				<h2 className='mb-6 font-satoshi text-xl font-bold text-dark dark:text-white'>
					Location Page Settings
				</h2>
				<LocationSettingForm initial={initial} />
			</Card>
		</>
	);
}
