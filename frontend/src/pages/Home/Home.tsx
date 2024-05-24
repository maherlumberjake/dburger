import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import "./Home.scss";

export default function Home() {
	const user = useUser();
	const navigate = useNavigate();
	return (
		<>
			<section
				id="entry"
				className=" flex flex-col px-4  justify-center gap-40  h-screen text-lg bg-no-repeat "
			>
				<div>
					<h1 className=" font-bold text-2xl !text-yellow-300 mb-4 md:text-4xl md:!text-yellow-500">
						Explore , order and enjoy your burger
					</h1>
					<p className="font-bold  text-md md:text-lg lg:text-2xl">
						All kind of burgers in one place for both vegeterian and
						non-vergeterian
					</p>
				</div>
				<div className="action">
					<p className="font-bold text-md md:text-lg lg:text-2xl">
						Try it your self by Signing in for free{" "}
					</p>
					<button
						disabled={user?.loading}
						onClick={() => {
							user?.error
								? location.reload()
								: navigate(user?.auth ? "/menu" : "/signUp");
						}}
						className=" border-current text-white border-4 py-1 px-3 rounded-full font-bold mt-3 capitalize lg:text-yellow-500
						md:hover:text-white hover:text-yellow-500
						"
					>
						{user?.error
							? "refresh"
							: user?.loading
							? "loading"
							: user?.auth
							? "menu"
							: "join now"}
					</button>
				</div>
			</section>
		</>
	);
}
