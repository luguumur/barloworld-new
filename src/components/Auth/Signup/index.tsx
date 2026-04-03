"use client";
import { useState } from "react";
import Link from "next/link";
import GithubSigninButton from "../GithubSigninButton";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithMagicLink from "../SigninWithMagicLink";
import SignupWithPassword from "../SignupWithPassword";

export default function Signup() {
	const [signinOption, setSigninOption] = useState("magic-link");

	return (
		<>
			<div className='mx-auto w-full max-w-[400px] px-4 py-10'>
				<div>
					<SignupWithPassword />
				</div>
				<p className='text-center font-satoshi text-base font-medium text-dark dark:text-white'>
					Already have an account?{" "}
					<Link href='/auth/signin' className='ml-1 inline-block text-primary'>
						Sign In →
					</Link>
				</p>
			</div>
		</>
	);
}
