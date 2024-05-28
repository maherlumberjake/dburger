import { useEffect, useState } from "react";
import { convertToBase64 } from "../../../util/base64";
import { axioslocal } from "../Signup/SignUp";
import "./Userprofile.scss";
import { redirect } from "react-router-dom";

axioslocal.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
	"jwt"
)}`;
import { USER } from "../../../models/USER";
import Burger from "../../../components/burgerComponent/burger";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
	return localStorage.getItem("jwt") ? null : redirect("/signup");
};

export default function UserProfile() {
	const [img, setImg] = useState<File>();
	const [encodedImage, setEncodedImg] = useState<string>("");
	const [loading, setLoading] = useState(false);

	if (img) {
		convertToBase64(img)
			.then((res) => {
				setEncodedImg(res);
			})
			.catch((err) => console.log(err));
	}
	async function handleSubmit() {
		try {
			setLoading(true);
			const res = await axioslocal.patch(`/profile`, {
				thumbnailImg: encodedImage,
			});
			setEncodedImg(res.data.user.thumbnailImg);
			setLoading(false);
			setImg(undefined);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}

	const [user, setUser] = useState<USER>();
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axioslocal.get("/profile");
				setUser(res.data.user);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	console.log(user);
	return (
		<>
			{user && !loading ? (
				<>
					<section>
						<div className="py-40 grid place-content-center">
							<div className="imgContainer">
								{user.name && loading && (
									<h1 className="md:text-4xl">loading</h1>
								)}
								<img
									src={encodedImage ? encodedImage : user.thumbnailImg}
									alt="loading"
									className=" rounded-full!aspect-square"
								/>
								<label
									htmlFor="profileImage"
									title="update current image"
								>
									{!loading && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-10 h-10 hover:text-white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
											/>
										</svg>
									)}
								</label>
								<h1 className="md:text-4xl">{user?.name}</h1>
								<h2 className="md:text-2xl">{user?.email}</h2>
							</div>
							<input
								type="file"
								accept=".jpeg, .png, .jpg"
								name="profileImage"
								id="profileImage"
								hidden
								onChange={(e) => e.target.files && setImg(e.target.files[0])}
							/>
							{img && (
								<button
									onClick={handleSubmit}
									className=" border p-4 border-yellow-400 hover:scale-105 transition-transform"
									disabled={loading}
								>
									{loading ? "updating..." : "Update image"}
								</button>
							)}
						</div>

						<section className="grid  sm:grid-col-2 md:grid-cols-4 p-12">
							{user.ownedBurgers.map((burger) => (
								<Burger
									burger={burger}
									key={burger._id}
								/>
							))}
						</section>
					</section>
				</>
			) : (
				<div className=" w-20  mt-20 mx-auto border-yellow-500 animate-spin h-20  border-4 rounded-full border-b-transparent"></div>
			)}
		</>
	);
}
