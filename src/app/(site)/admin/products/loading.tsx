import AdminTableSkeleton from "@/components/Admin/Common/AdminTableSkeleton";
export default function Loading() {
	return (
		<AdminTableSkeleton pageTitle='Products' rows={10} cols={5} hasImage />
	);
}
