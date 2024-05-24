import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import "./menu.scss";
axioslocal.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
	"jwt"
)}`;
import placeholderimg from "../../assets/burger.png";
import { axioslocal } from "../auth/Signup/SignUp";
import { disCount } from "../../util/discount";
import { BURGER } from "../../models/BURGER";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
	return (
		!localStorage.getItem("jwt") &&
		redirect("/signup?message=you have to log in first")
	);
};

export default function UserProfile() {
	const [menu, setMenu] = useState<BURGER[]>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axioslocal.get("/menu");
				setMenu(res.data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			{loading ? (
				<h2>loading </h2>
			) : (
				<section id="menu">
					{menu?.map((burger) => (
						<div
							key={burger._id}
							className="card"
						>
							<img
								src={placeholderimg}
								alt="img"
							/>
							<h3> {burger.title} </h3>
							{burger.discount > 0 && (
								<span> Discount: {burger.discount} % </span>
							)}

							<div className="spanContainer">
								<div className="likes">
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
											d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
										/>
									</svg>
									<span>{burger.likes} </span>
								</div>
								<div className="price">
									<span> {burger.price}$</span>
									<span> {disCount(burger.price, burger.discount)}$ </span>
								</div>
							</div>
						</div>
					))}
				</section>
			)}
			<Link
				to={"createNew"}
				id="createNewBurger"
				title="Create new burger"
			>
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
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					/>
				</svg>
			</Link>
		</>
	);
}
