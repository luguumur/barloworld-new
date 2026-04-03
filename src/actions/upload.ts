"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isAuthorized } from "@/libs/isAuthorized";

const s3Client = new S3Client({
	region: process.env.AWS_REGION ?? "ap-southeast-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
});

const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxSize = 2000000; // 2mb

/** S3 key prefix (folder). Use "" for root, or e.g. "profiles" for profiles/profile-image--id */
const S3_KEY_PREFIX = process.env.AWS_S3_KEY_PREFIX ?? "profiles";

export async function getSignedURL(
	type: string,
	size: number,
	prefix: string,
	name: string
) {
	if (!prefix) {
		return { failure: "prefix is required" };
	}

	const user = await isAuthorized();

	if (!user) {
		return { failure: "not authenticated" };
	}

	if (!acceptedTypes.includes(type)) {
		return { failure: "invalid file type" };
	}

	if (size > maxSize) {
		return { failure: "file too large" };
	}

	const key = `${prefix.replace(/\/$/, "")}/${name}`;

	const putObjectCommand = new PutObjectCommand({
		Bucket: process.env.AWS_S3_BUCKET!,
		Key: key,
		ContentType: type,
		ContentLength: size,
		ACL: "public-read",
		Metadata: {
			userId: user.id,
		},
	});

	const url = await getSignedUrl(
		s3Client,
		putObjectCommand,
		{ expiresIn: 60 } // 60 seconds
	);

	return { success: { url, key } };
}
