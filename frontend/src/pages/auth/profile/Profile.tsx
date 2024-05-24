import { Link } from "react-router-dom";
import avatar from "../../../assets/avatar.png";
export default function Profile(props?: { name?: string; img?: string }) {
	return (
		<div
			className=" absolute right-0 mt-10 mr-4 bg-white rounded-md px-4 py-3  flex flex-col gap-3 overflow-hidden shadow-sm shadow-slate-300"
			style={{ backgroundColor: "var(--bgc)" }}
		>
			<div className=" w-full aspect-square  border-2 rounded-full absolute -bottom-1/4 left-0 border-current"></div>
			<img
				src={props?.img && props.img != "noImg" ? props.img : avatar}
				alt="profile image"
				className=" rounded-full size-28  border-2 border-current"
			/>

			<h3 className="capitalize text-yellow-500 z-50">
				{" "}
				{props?.name || "unKnown"}
			</h3>
			<div className="flex  justify-between z-50">
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
						/>
					</svg>
				</button>
				<Link to="/UserProfile">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
				</Link>
				<button
					onClick={() => {
						localStorage.removeItem("jwt");
						location.reload();
					}}
					title="logout"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 rotate-180 "
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
