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
				<div className="inputsContainer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
					<input
						type="text"
						required
						id="name"
						name="name"
						placeholder=" your name"
						minLength={3}
					/>
				</div>
				<label htmlFor="email">Email</label>
				<div className="inputsContainer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
						/>
					</svg>
					<input
						type="email"
						id="email"
						required
						name="email"
						placeholder=" example@gmail.com"
					/>
				</div>
				<label htmlFor="password">Password</label>
				<div className="inputsContainer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
						/>
					</svg>
					<input
						type="password"
						id="password"
						required
						name="password"
						minLength={6}
						placeholder=" yourPassw0rd1990"
					/>
				</div>
				<label htmlFor="confirmPassword">confirm password</label>
				<div className="inputsContainer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
						/>
					</svg>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						required
						minLength={6}
						placeholder="confirm your password"
					/>
				</div>
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
