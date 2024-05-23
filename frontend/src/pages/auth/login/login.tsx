import {
	Form,
	Link,
	redirect,
	useActionData,
	useNavigation,
} from "react-router-dom";

import logo from "../../../assets/logov1.png";
import "./login.scss";
import axios, { AxiosInstance } from "axios";

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

		if (password && email) {
			try {
				const us = await axios
					.post("http://localhost:4000/api/v1/login", {
						email,
						password,
					})
					.catch((err) => {
						return err.responce.date;
					});
				localStorage.setItem("jwt", us.data.token);
				axioslocal.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
					"jwt"
				)}`;
				return redirect("/UserProfile");
			} catch (err) {
				return err ? "Invalid credentials" : "Something went wrong";
			}
		} else {
			return "Please fill the fileds with your correct data";
		}
	} catch (error: unknown) {
		return error;
	}
}
// eslint-disable-next-line react-refresh/only-export-components

export default function Login() {
	let err = useActionData() as string;
	err =
		err && err.includes("code 400")
			? "this email already have an account"
			: err;
	const status = useNavigation();

	return (
		<div className=" grid columns-1 justify-center  gap-10  py-40">
			<img
				id="formLogo"
				src={logo}
				alt="logo image"
				className="w-20 md:w-40 block mx-auto"
			/>
			{err && <h4 className="text-red-600 dark:text-red-400 "> {err} </h4>}
			<h1 className="text-center text-2xl md:text-4xl">
				Welcome back in the <span>D'burger</span>
			</h1>
			<Form
				className="grid md:grid-cols-2"
				method="post"
				id="login"
				replace
			>
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
				<input
					disabled={status.state === "submitting"}
					type="submit"
					value={status.state === "submitting" ? "sending..." : "send"}
					className=" md:col-span-2  border-2 border-current cursor-pointer hover:scale-105 font-bold mt-4 !p-1 transition-transform"
				/>
			</Form>
			<Link
				to="/signup"
				className="text-center underline"
			>
				dont have an account?
			</Link>
		</div>
	);
}
