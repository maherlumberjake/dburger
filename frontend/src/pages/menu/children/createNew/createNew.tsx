import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { axioslocal } from "../../../auth/Signup/SignUp";
import "./createNew.scss";
import { AxiosError } from "axios";
import { useState } from "react";
import { convertToBase64 } from "../../../../util/base64";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
	return localStorage.getItem("jwt") ? null : redirect("/signup");
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }: { request: Request }) => {
	axioslocal.defaults.headers.common.authorization = `Bearer ${localStorage.getItem(
		"jwt"
	)}`;
	try {
		const data = await request.formData();
		const title = data.get("title") as string;
		const description = data.get("description") as string;
		let price: string | number = data.get("price") as string;
		let discount: string | number = data.get("discount") as string;
		let kind: string | boolean = data.get("kind") as string;
		const displayImg = data.get("displayImg") as File;

		kind = kind == "NONvegeterian" ? true : false;
		price = parseInt(price);
		discount = parseInt(discount);

		if (!title || !description || !price) {
			return new Error(
				"please fill the required filled [title,description,price]"
			);
		} else if (discount > 95) {
			return new Error("discount cant be more 90%");
		} else if (title.length > 30 || title.length < 3) {
			return new Error("title must be between 3 and 30 characters");
		} else if (description.length > 250 || description.length < 5) {
			return new Error("description must be between 5 and 250 characters");
		} else if (price > 1000) {
			return new Error("price cant be more 1000$");
		} else {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("description", description);
			formData.append("price", `${price}`);
			formData.append("discount", `${discount}`);
			formData.append("kind", `${kind}`);
			formData.append("displayImg", displayImg);

			try {
				const us = await axioslocal.post("/menu", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				return us ? redirect("/menu") : null;
			} catch (error) {
				return error instanceof AxiosError
					? error.message
					: "some error has occured";
			}
		}
	} catch (error) {
		return error;
	}
};
export default function CreateNewBurger() {
	const err = useActionData() as Error;

	const [encodedImg, setencodedImg] = useState<string | null>();
	console.log("error is" + err);
	async function handleChange(list: FileList | null) {
		if (list) {
			const e = list[0];
			setencodedImg(await convertToBase64(e));
		}
	}
	const status = useNavigation();
	return (
		<>
			{err && <h3 className="text-red-500">{err.message}</h3>}
			<Form
				method="post"
				replace
				encType="multipart/form-data"
				className="grid grid-cols-1 justify-center gap-10 py-40 sm:grid-cols-3 px-20"
			>
				<div className="flex flex-col items-center border-4 border-orange-900 p-4 rounded-lg border-dashed  justify-center">
					{encodedImg && (
						<img
							src={encodedImg}
							alt="displauImg"
							width={200}
						/>
					)}
					<label
						htmlFor="displayImg"
						className=" capitalize  cursor-pointer"
					>
						choose an img
						<input
							type="file"
							hidden
							onChange={(e) => handleChange(e.target.files)}
							name="displayImg"
							id="displayImg"
							accept=".png , .jpg , .jpeg"
						/>
					</label>
				</div>
				<div>
					<label
						htmlFor="title"
						className="block text-lg mb-2"
					>
						Title:
					</label>
					<input
						type="text"
						id="title"
						name="title"
						className="w-full p-2 pl-10 text-sm text-gray-400"
						placeholder="Enter title"
						minLength={3}
						maxLength={30}
					/>
					<label
						htmlFor="description"
						className="block text-lg mb-2"
					>
						Description:
					</label>
					<input
						type="text"
						name="description"
						id="description"
						className="w-full p-2 pl-10 text-sm text-gray-400"
						placeholder="Enter description"
						maxLength={250}
						minLength={5}
					/>
					<label
						htmlFor="price"
						className="block text-lg mb-2"
					>
						Price:
					</label>
					<input
						type="number"
						id="price"
						name="price"
						className="w-full p-2 pl-10 text-sm text-gray-400"
						placeholder="Enter price"
						min={1}
						max={1000}
					/>
					<label
						htmlFor="discount"
						className="block text-lg mb-2"
					>
						Discount:
					</label>
					<input
						type="number"
						id="discount"
						min={0}
						name="discount"
						className="w-full p-2 pl-10 text-sm text-gray-400"
						placeholder="Enter discount"
					/>
					<div className="kind flex  items-center justify-between">
						<label
							htmlFor="vegeterian"
							className="block text-lg mb-2 "
						>
							vegeterian
							<input
								defaultChecked
								id="vegeterian"
								value="vegeterian"
								type="radio"
								name="kind"
								className="ml-4"
							/>
						</label>
						<label
							htmlFor="NONvegeterian"
							className="block text-lg mb-2"
						>
							non-vegeterian
							<input
								id="NONvegeterian"
								value="NONvegeterian"
								type="radio"
								name="kind"
								className="ml-4"
							/>
						</label>
					</div>

					<button
						disabled={status.state === "submitting"}
						type="submit"
						className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
					>
						{status.state === "submitting" ? "Submitting..." : "Submit"}
					</button>
				</div>
			</Form>
		</>
	);
}
