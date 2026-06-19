import AdminTableSkeleton from "@/components/Admin/Common/AdminTableSkeleton";
export default function Loading() {
	return (
		<AdminTableSkeleton pageTitle='Product Types' rows={8} cols={3} hasImage />
	);
}
