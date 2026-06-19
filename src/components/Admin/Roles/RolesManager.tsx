"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
	createAdminRole,
	updateAdminRole,
	deleteAdminRole,
	type AdminRoleRow,
} from "@/actions/adminRole";

const ALL_PERMISSIONS: { path: string; label: string; group: string }[] = [
	{ path: "/admin/products", label: "Products", group: "Catalog" },
	{ path: "/admin/product-types", label: "Product Types", group: "Catalog" },
	{
		path: "/admin/product-categories",
		label: "Product Categories",
		group: "Catalog",
	},
	{
		path: "/admin/attribute-value-groups",
		label: "Attribute Groups",
		group: "Catalog",
	},
	{ path: "/admin/attributes", label: "Attributes", group: "Catalog" },
	{ path: "/admin/news", label: "News", group: "Content" },
	{ path: "/admin/news-category", label: "News Categories", group: "Content" },
	{ path: "/admin/deals", label: "Deals & Specials", group: "Content" },
	{ path: "/admin/mastheads", label: "Mastheads", group: "Content" },
	{ path: "/admin/magazines", label: "Magazines", group: "Content" },
	{ path: "/admin/pages", label: "Pages", group: "Content" },
	{ path: "/admin/home-main", label: "Home Content", group: "Content" },
	{ path: "/admin/testimonials", label: "Testimonials", group: "Content" },
	{ path: "/admin/translations", label: "Translations", group: "Content" },
	{ path: "/admin/team", label: "Team", group: "Organization" },
	{ path: "/admin/menu", label: "Menu", group: "Organization" },
	{ path: "/admin/location", label: "Location", group: "Organization" },
	{ path: "/admin/notifications", label: "Notifications", group: "System" },
	{ path: "/admin/manage-users", label: "Manage Users", group: "System" },
];

const COLORS = [
	"#6366f1",
	"#f59e0b",
	"#10b981",
	"#3b82f6",
	"#ec4899",
	"#8b5cf6",
	"#14b8a6",
	"#f97316",
	"#ef4444",
	"#06b6d4",
];

const groups = Array.from(new Set(ALL_PERMISSIONS.map((p) => p.group)));

function RoleBadge({ color, label }: { color: string; label: string }) {
	return (
		<span
			className='inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-white'
			style={{ background: color }}
		>
			{label}
		</span>
	);
}

export default function RolesManager({
	roles: initial,
}: {
	roles: AdminRoleRow[];
}) {
	const router = useRouter();
	const [roles, setRoles] = useState(initial);
	const [editing, setEditing] = useState<AdminRoleRow | null>(null);
	const [creating, setCreating] = useState(false);
	const [isPending, startTransition] = useTransition();

	const [newRole, setNewRole] = useState({
		name: "",
		label: "",
		color: COLORS[0],
		permissions: [] as string[],
	});

	const togglePermission = (perms: string[], path: string): string[] =>
		perms.includes(path) ? perms.filter((p) => p !== path) : [...perms, path];

	const handleCreate = () => {
		if (!newRole.name.trim() || !newRole.label.trim()) {
			toast.error("Name and label are required");
			return;
		}
		startTransition(async () => {
			try {
				const created = await createAdminRole(newRole);
				setRoles((r) => [...r, created]);
				setCreating(false);
				setNewRole({ name: "", label: "", color: COLORS[0], permissions: [] });
				toast.success("Role created");
				router.refresh();
			} catch (e: any) {
				toast.error(e?.message ?? "Failed to create role");
			}
		});
	};

	const handleUpdate = () => {
		if (!editing) return;
		startTransition(async () => {
			try {
				const updated = await updateAdminRole(editing.id, {
					label: editing.label,
					color: editing.color,
					permissions: editing.permissions,
				});
				setRoles((r) =>
					r.map((role) => (role.id === updated.id ? updated : role))
				);
				setEditing(null);
				toast.success("Role updated");
				router.refresh();
			} catch {
				toast.error("Failed to update role");
			}
		});
	};

	const handleDelete = (id: string) => {
		startTransition(async () => {
			try {
				await deleteAdminRole(id);
				setRoles((r) => r.filter((role) => role.id !== id));
				toast.success("Role deleted");
				router.refresh();
			} catch {
				toast.error("Failed to delete role");
			}
		});
	};

	const PermissionGrid = ({
		selected,
		onChange,
	}: {
		selected: string[];
		onChange: (perms: string[]) => void;
	}) => (
		<div className='space-y-4'>
			{groups.map((group) => (
				<div key={group}>
					<p className='mb-2 text-xs font-semibold uppercase tracking-wider text-body dark:text-gray-4'>
						{group}
					</p>
					<div className='flex flex-wrap gap-2'>
						{ALL_PERMISSIONS.filter((p) => p.group === group).map((p) => {
							const active = selected.includes(p.path);
							return (
								<button
									key={p.path}
									type='button'
									onClick={() => onChange(togglePermission(selected, p.path))}
									className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
										active
											? "border-primary bg-primary text-white"
											: "border-stroke bg-gray-1 text-dark hover:border-primary dark:border-dark-3 dark:bg-white/5 dark:text-white"
									}`}
								>
									{p.label}
								</button>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className='space-y-6'>
			{/* Existing roles */}
			{roles.map((role) => (
				<div
					key={role.id}
					className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'
				>
					{editing?.id === role.id ? (
						<div className='space-y-4'>
							<div className='flex items-center gap-3'>
								<RoleBadge
									color={editing.color}
									label={editing.label || "Preview"}
								/>
								<input
									value={editing.label}
									onChange={(e) =>
										setEditing({ ...editing, label: e.target.value })
									}
									placeholder='Display label'
									className='flex-1 rounded-lg border border-stroke bg-gray-1 px-3 py-2 text-sm dark:border-dark-3 dark:bg-white/5 dark:text-white'
								/>
								<div className='flex gap-1.5'>
									{COLORS.map((c) => (
										<button
											key={c}
											type='button'
											onClick={() => setEditing({ ...editing, color: c })}
											className={`h-6 w-6 rounded-full transition-transform ${
												editing.color === c
													? "scale-125 ring-2 ring-primary ring-offset-1"
													: ""
											}`}
											style={{ background: c }}
										/>
									))}
								</div>
							</div>

							<PermissionGrid
								selected={editing.permissions}
								onChange={(perms) =>
									setEditing({ ...editing, permissions: perms })
								}
							/>

							<div className='flex gap-3'>
								<button
									onClick={() => setEditing(null)}
									className='rounded-lg border border-stroke px-4 py-2 text-sm text-dark hover:bg-gray-1 dark:border-dark-3 dark:text-white dark:hover:bg-white/5'
								>
									Cancel
								</button>
								<button
									onClick={handleUpdate}
									disabled={isPending}
									className='rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary-dark disabled:opacity-60'
								>
									{isPending ? "Saving…" : "Save Changes"}
								</button>
							</div>
						</div>
					) : (
						<div>
							<div className='mb-4 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<RoleBadge color={role.color} label={role.label} />
									<span className='text-xs text-body dark:text-gray-4'>
										{role.name}
									</span>
									<span className='text-xs text-body dark:text-gray-4'>·</span>
									<span className='text-xs text-body dark:text-gray-4'>
										{role.permissions.length} permission
										{role.permissions.length !== 1 ? "s" : ""}
									</span>
								</div>
								<div className='flex gap-2'>
									<button
										onClick={() => setEditing(role)}
										className='rounded-lg border border-stroke px-3 py-1.5 text-sm text-dark hover:bg-gray-1 dark:border-dark-3 dark:text-white dark:hover:bg-white/5'
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(role.id)}
										disabled={isPending}
										className='rounded-lg bg-red-light-5 px-3 py-1.5 text-sm text-red hover:bg-red hover:text-white dark:bg-red/10 dark:hover:bg-red'
									>
										Delete
									</button>
								</div>
							</div>
							<div className='flex flex-wrap gap-2'>
								{role.permissions.length === 0 ? (
									<span className='text-sm text-body dark:text-gray-4'>
										No permissions — this role cannot access any section.
									</span>
								) : (
									ALL_PERMISSIONS.filter((p) =>
										role.permissions.includes(p.path)
									).map((p) => (
										<span
											key={p.path}
											className='rounded-lg bg-gray-1 px-2.5 py-1 text-xs font-medium text-dark dark:bg-white/5 dark:text-white'
										>
											{p.label}
										</span>
									))
								)}
							</div>
						</div>
					)}
				</div>
			))}

			{/* Create new role */}
			{creating ? (
				<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark'>
					<h4 className='mb-4 font-semibold text-dark dark:text-white'>
						New Role
					</h4>
					<div className='mb-4 flex items-center gap-3'>
						<input
							value={newRole.name}
							onChange={(e) =>
								setNewRole({
									...newRole,
									name: e.target.value.toUpperCase().replace(/\s/g, "_"),
								})
							}
							placeholder='ROLE_KEY (e.g. EDITOR)'
							className='font-mono w-40 rounded-lg border border-stroke bg-gray-1 px-3 py-2 text-sm dark:border-dark-3 dark:bg-white/5 dark:text-white'
						/>
						<input
							value={newRole.label}
							onChange={(e) =>
								setNewRole({ ...newRole, label: e.target.value })
							}
							placeholder='Display label'
							className='flex-1 rounded-lg border border-stroke bg-gray-1 px-3 py-2 text-sm dark:border-dark-3 dark:bg-white/5 dark:text-white'
						/>
						<div className='flex gap-1.5'>
							{COLORS.map((c) => (
								<button
									key={c}
									type='button'
									onClick={() => setNewRole({ ...newRole, color: c })}
									className={`h-6 w-6 rounded-full transition-transform ${
										newRole.color === c
											? "scale-125 ring-2 ring-primary ring-offset-1"
											: ""
									}`}
									style={{ background: c }}
								/>
							))}
						</div>
					</div>

					<PermissionGrid
						selected={newRole.permissions}
						onChange={(perms) => setNewRole({ ...newRole, permissions: perms })}
					/>

					<div className='mt-4 flex gap-3'>
						<button
							onClick={() => setCreating(false)}
							className='rounded-lg border border-stroke px-4 py-2 text-sm text-dark hover:bg-gray-1 dark:border-dark-3 dark:text-white dark:hover:bg-white/5'
						>
							Cancel
						</button>
						<button
							onClick={handleCreate}
							disabled={isPending}
							className='rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary-dark disabled:opacity-60'
						>
							{isPending ? "Creating…" : "Create Role"}
						</button>
					</div>
				</div>
			) : (
				<button
					onClick={() => setCreating(true)}
					className='flex w-full items-center justify-center gap-2 rounded-10 border-2 border-dashed border-stroke py-4 text-sm font-medium text-body hover:border-primary hover:text-primary dark:border-dark-3 dark:text-gray-4 dark:hover:border-primary dark:hover:text-primary'
				>
					+ Create New Role
				</button>
			)}
		</div>
	);
}
