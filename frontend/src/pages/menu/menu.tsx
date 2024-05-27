import { MouseEvent, useEffect, useState } from "react";
import { Link, redirect, useSearchParams } from "react-router-dom";
import "./menu.scss";
axioslocal.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
	"jwt"
)}`;
import { axioslocal } from "../auth/Signup/SignUp";
import { BURGER } from "../../models/BURGER";
import Burger from "../../components/burgerComponent/burger";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
	return (
		!localStorage.getItem("jwt") &&
		redirect("/signup?message=you have to log in first")
	);
};
interface responce {
	data: BURGER[];
	totalBurgers: number;
}
export default function UserProfile() {
	const [menu, setMenu] = useState<responce>({ data: [], totalBurgers: 0 });
	const [loading, setLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const [currentPage, setCurrentPage] = useState<number>(
		parseInt(searchParams.get("page") || "1")
	);
	const maxPages = Math.ceil(menu?.totalBurgers / 5);

	function previosPage(
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) {
		e.stopPropagation();
		setCurrentPage((p) => p - 1);
		return setSearchParams(`?page=${currentPage - 1}`);
	}
	function nextPage(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
		e.stopPropagation();
		setCurrentPage((p) => p + 1);
		return setSearchParams(`?page=${currentPage + 1}`);
	}
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axioslocal.get(`/menu?page=${currentPage}`);
				setMenu(res.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [currentPage, searchParams]);
	console.log(menu);

	return (
		<>
			{!loading && (
				<div className="flex justify-center items-center pt-14 space-x-4 w-full">
					{currentPage !== 1 && (
						<button
							onClick={(e) => previosPage(e)}
							className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
						>
							Previous Page
						</button>
					)}
					<span className="text-xl font-bold">{currentPage}</span>
					{maxPages !== currentPage && maxPages != 0 && (
						<button
							onClick={(e) => nextPage(e)}
							className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
						>
							Next Page
						</button>
					)}
				</div>
			)}
			{menu.totalBurgers == 0 && !loading && (
				<h2 className="text-center text-4xl text-yellow-500 py-40">
					no data to show
				</h2>
			)}
			{loading ? (
				<h2 className="text-center text-yellow-500 text-3xl font-bold py-40">
					loading...
				</h2>
			) : (
				<section id="menu">
					{menu?.data?.map((burger) => (
						<Burger
							burger={burger}
							key={burger._id}
						/>
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
