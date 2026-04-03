"use client";
import Link from "next/link";
import { useState } from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import GithubSigninButton from "../GithubSigninButton";
import SigninWithMagicLink from "../SigninWithMagicLink";
import SigninWithPassword from "../SigninWithPassword";
import DemoSignin from "./DemoSignin";

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
