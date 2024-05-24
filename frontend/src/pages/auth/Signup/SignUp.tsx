import {
	Form,
	Link,
	redirect,
	useActionData,
	useNavigation,
	useSearchParams,
} from "react-router-dom";
import "./signUp.scss";

import logo from "../../../assets/logov1.png";

import axios, { AxiosError, AxiosInstance } from "axios";
import { useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const axioslocal: AxiosInstance = axios.create({
	baseURL: "http://localhost:4000/api/v1",
});

// eslint-disable-next-line react-refresh/only-export-components
export const Loader = () => {
	if (localStorage.getItem("jwt")) {
		return redirect("/");
	}
	return null;
};
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: { request: Request }) {
	try {
		const data = await request.formData();
		const email = data.get("email") as string;
		const password = data.get("password") as string;
		const confirmPassword = data.get("confirmPassword") as string;
		const name = data.get("name") as string;
		if (
			password === confirmPassword &&
			email &&
			password &&
			confirmPassword &&
			name
		) {
			try {
				const us = await axios.post("http://localhost:4000/api/v1/signUp", {
					name,
					email,
					password,
					confirmPassword,
				});

				localStorage.setItem("jwt", us.data.token);
				axioslocal.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
					"jwt"
				)}`;
				location.reload();
				return redirect("/UserProfile");
			} catch (error) {
				return error instanceof AxiosError
					? error.message
					: "some error has occured";
			}
		} else {
			return "Please fill all the fields and make sure the 2 passwords match";
		}
	} catch (error: unknown) {
		return error;
	}
}
// eslint-disable-next-line react-refresh/only-export-components

export default function SignUp() {
	const [searchParams] = useSearchParams();
	const [msg, setMessage] = useState<string | null>(
		searchParams.get("message")
	);
	if (msg) {
		setTimeout(() => {
			setMessage(null);
		}, 2000);
	}
	let err = useActionData() as string;
	err =
		err && err.includes("code 400")
			? "this email already have an account"
			: err;
	const status = useNavigation();

	return (
		<div className=" text-sm md:text-lg grid columns-1 justify-center  gap-5 md:gap-10  py-10">
			<img
				id="formLogo"
				src={logo}
				alt="logo image"
				className="w-20 md:w-40 block mx-auto"
			/>
			{err && (
				<h4 className="text-red-600 dark:text-white border-b-2 border-red-700 py-2 text-xl text-center">
					{" "}
					{err}{" "}
				</h4>
			)}
			{msg && (
				<h4 className="text-red-600 dark:text-white border-b-2 border-red-700 py-2 text-xl text-center ">
					{" "}
					{msg}{" "}
				</h4>
			)}
			<h1 className="text-center text-2xl md:text-4xl">
				Welcome in the
				<span className="block text-yellow-500 my-2 font-bold">D'burger</span>
			</h1>
			<Form
				method="post"
				id="signUP"
				replace
			>
				<label htmlFor="name">Name </label>
				<input
					type="text"
					required
					id="name"
					name="name"
					placeholder=" your name"
					minLength={3}
				/>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					required
					name="email"
					placeholder=" example@gmail.com"
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					required
					name="password"
					minLength={6}
					placeholder=" yourPassw0rd1990"
				/>
				<label htmlFor="confirmPassword">confirm password</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					required
					minLength={6}
					placeholder="confirm your password"
				/>
				<input
					disabled={status.state === "submitting"}
					type="submit"
					value={status.state === "submitting" ? "sending..." : "send"}
					className=" border-2 border-current cursor-pointer hover:scale-105 font-bold mt-4 !p-1 transition-transform"
				/>
			</Form>
			<Link
				to="/login"
				className="text-center underline"
			>
				already have an account?
			</Link>
		</div>
	);
}
