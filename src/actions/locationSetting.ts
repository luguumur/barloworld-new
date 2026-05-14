"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type LocationSettingRow = {
	id: string;
	image: string;
	mapEmbedUrl: string;
	address: string;
	address_en: string;
	phone: string;
	email: string;
};

export type LocationSettingInput = Omit<LocationSettingRow, "id">;

export async function getLocationSetting() {
	try {
		const rows = await prisma.locationSetting.findMany({ take: 1 });
		return (rows[0] ?? null) as LocationSettingRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function upsertLocationSetting(data: LocationSettingInput) {
	await isAuthorized();
	const existing = await prisma.locationSetting.findMany({ take: 1 });
	if (existing[0]) {
		return prisma.locationSetting.update({
			where: { id: existing[0].id },
			data,
		});
	}
	return prisma.locationSetting.create({ data });
}
