import AdminTableSkeleton from "@/components/Admin/Common/AdminTableSkeleton";
export default function Loading() {
	return (
		<AdminTableSkeleton pageTitle='Magazines' rows={8} cols={5} hasImage />
	);
}
