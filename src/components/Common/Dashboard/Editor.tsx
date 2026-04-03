"use client";
import dynamic from "next/dynamic";
import { LegacyRef, useRef } from "react";
import type ReactQuill from "react-quill";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
	forwardedRef: LegacyRef<ReactQuill>;
}

const ReactQuillBase = dynamic(
	async () => {
		const { default: RQ } = await import("react-quill");

		function QuillJS({ forwardedRef, ...props }: IWrappedComponent) {
			return <RQ ref={forwardedRef} {...props} />;
		}

		return QuillJS;
	},
	{
		ssr: false,
	}
);

export interface EditorProps {
	label?: string;
	value?: string;
	placeholder?: string;
	onChange?: (value: string) => void;
}

export function Editor({ label, value = "", placeholder, onChange }: EditorProps) {
	const quillRef = useRef<ReactQuill>(null);

	return (
		<div>
			{label && (
				<label className="mb-2.5 block font-satoshi text-base font-medium text-dark dark:text-white">
					{label}
				</label>
			)}
			<div className="rounded-lg border border-gray-3 focus-within:shadow-input focus-within:ring-2 focus-within:ring-primary/20 dark:border-stroke-dark dark:bg-transparent">
				<ReactQuillBase
					forwardedRef={quillRef}
					value={value}
					placeholder={placeholder}
					onChange={(content) => onChange?.(content)}
					theme="snow"
					className="[&_.ql-editor]:min-h-[120px] [&_.ql-container]:border-0 [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-stroke [&_.ql-toolbar]:dark:border-stroke-dark"
				/>
			</div>
		</div>
	);
}
