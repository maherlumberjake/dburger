import { useParams } from "react-router-dom";
import { axioslocal } from "../../../auth/Signup/SignUp";
import { useEffect, useRef, useState } from "react";
import { BURGER } from "../../../../models/BURGER";
// import { Link } from 'react-router-dom'

import { disCount } from "../../../../util/discount";
import { formatDates } from "../../../../util/formatDate";

export default function BurgerDetails() {
	const { id } = useParams();
	const [burger, setBurger] = useState<BURGER>();
	const commentRef = useRef<HTMLInputElement>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	async function sendComment() {
		const comment = commentRef.current?.value;
		if (!comment) {
			return "cannot send empty comment";
		} else {
			try {
				await axioslocal.patch(`menu/${burger?._id}`, { comment });
				setMessage("sent successfully");
			} catch (error) {
				setMessage("could not send successfully");
				console.log(error);
			}
		}
	}

	useEffect(() => {
		const fetchBurgerDetails = async () => {
			try {
				setLoading(true);
				axioslocal
					.get(`menu/${id}`)
					.then((res) => setBurger(res.data.burger))
					.catch((err) => {
						throw new Error(err);
					});
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchBurgerDetails();
	}, [id, message]);
	return (
		<>
			{!loading && burger ? (
				<div className="burgerDetails grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 pt-20">
					<div>
						<img
							src={burger?.displayImg}
							alt="burgerimg"
							width={500}
						/>
					</div>
					<div className=" grid grid-cols-2 justify-between items-center gap-4">
						<h1 className="text-yellow-500 font-bold capitalize text-xl sm:text-2xl">
							{burger?.title}
						</h1>
						{burger?.discount && burger?.discount > 0 ? (
							<span className="text-xl sm:text-2xl text-yellow-400 font-bold justify-self-end">
								{burger?.discount} % Discount
							</span>
						) : (
							<span>no Discount</span>
						)}
						<div className="flex gap-4">
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
							<span>{burger?.likes} </span>
						</div>
						<span className="text-xl sm:text-2xl text-red-500 line-through font-bold justify-self-end">
							{burger?.price} $
						</span>
						<h3 className="text-xl sm:text-2xl text-yellow-500">
							Descreption :
						</h3>
						<span className="text-xl sm:text-2xll text-yellow-400 font-bold justify-self-end">
							{" "}
							{burger?.price && disCount(burger?.price, burger?.discount)}
						</span>

						<p className=" col-span-2 leading-6 shadow-sm shadow-slate-50 p-1 min-h-40">
							{burger?.description}
						</p>
						<div className=" col-span-2  flex gap-4">
							<input
								type="text"
								ref={commentRef}
								name="comment"
								id="comment"
								placeholder="leave a comment . . ."
								className=" outline-none placeholder:!text-slate-500 p-1 w-1/3"
							/>
							<button
								onClick={sendComment}
								className=" transition-transform hover:scale-105 border-current text-yellow-500 border-2 p-y px-2 font-bold rounded-md w-1/3 "
							>
								send
							</button>
							<button className=" text-red-950 transition-transform hover:scale-105 border-current bg-yellow-500 border-2 p-y px-2 font-bold w-1/3  rounded-md">
								add to cart
							</button>
						</div>
					</div>
					<section className=" grid-cols-subgrid gap-4">
						<div className="flex items-center  gap-4 ">
							<span className="text-xl sm:text-2xl">
								{burger.comments.length}
							</span>

							<h3 className="text-xl sm:text-2xl text-yellow-500">
								Comments :
							</h3>
						</div>
						{burger?.comments.map((comment) => (
							<div
								key={comment._id}
								className="  shadow-red-900 shadow-sm grid grid-cols-3 gap-2 p-2"
							>
								<div className="flex items-center col-span-3 gap-2">
									<img
										src={comment.byUser.thumbnailImg}
										alt="user img "
										className=" w-12 rounded-full"
									/>
									<h4 className=" capitalize text-yellow-500">
										{comment.byUser.name} said :
									</h4>
								</div>
								<p className="col-span-3">{comment.comment}</p>
								<span>{formatDates(comment.timestamp)}</span>
							</div>
						))}
					</section>
				</div>
			) : (
				<h2 className="text-center text-yellow-500 text-3xl font-bold py-40">
					loading...
				</h2>
			)}
		</>
	);
}
