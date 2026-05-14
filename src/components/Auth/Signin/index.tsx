"use client";
import Link from "next/link";
import { useState } from "react";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
	const [signinOption, setSigninOption] = useState("magic-link");

	return (
		<>
			<div className='mx-auto w-full max-w-[400px] px-4 py-10'>
				<div>
					<SigninWithPassword />
				</div>
			</div>
		</>
	);
}
