import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/lowLogov1.png";
import Profile from "./auth/profile/Profile";
import { useState } from "react";
import { useUser } from "../contexts/userContext";

export default function Root() {
	const [show, setShow] = useState<boolean>(false);
	const toggleShow = (): void => {
		setShow((s) => !s);
	};
	const user = useUser();
	return (
		<>
			<header className=" py-2 px-4 w-full flex items-center z-50 fixed justify-between rounded-sm ">
				<Link to="/">
					<img
						src={logo}
						alt="logo"
						className=" inline"
						width="50"
						height="50"
					/>
				</Link>
				<nav className=" inline-flex text-yellow-400 gap-3 text-center font-bold md:text-lg md:gap-7">
					<NavLink
						to="about"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						{" "}
						About
					</NavLink>
					<NavLink
						to="menu"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						{" "}
						Menu
					</NavLink>
					{!user?.loading && !user?.error ? (
						<>
							{!user?.auth ? (
								<NavLink
									to="signUp"
									className={({ isActive }) => (isActive ? "active" : "")}
								>
									{" "}
									Sign up
								</NavLink>
							) : (
								<button onClick={toggleShow}>profile</button>
							)}
							{show && (
								<Profile
									name={user?.user.user.name || "unknow"}
									img={user?.user.user.thumbnailImg}
								/>
							)}
						</>
					) : (
						<h2>{user.error ? "Server error" : "Loading..."}</h2>
					)}
				</nav>
			</header>
			<Outlet />
			<footer className="text-center py-1 fixed bottom-0 w-full">
				&copy; D'burger.com
			</footer>
		</>
	);
}
