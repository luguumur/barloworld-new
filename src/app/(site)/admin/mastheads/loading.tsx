import AdminTableSkeleton from "@/components/Admin/Common/AdminTableSkeleton";
export default function Loading() {
	return (
		<AdminTableSkeleton pageTitle='Mastheads' rows={6} cols={4} hasImage />
	);
}
