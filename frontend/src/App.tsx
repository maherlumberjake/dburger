import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root/Root";
import Home from "./pages/Home/Home";
import SignUp, {
	Loader as isAuth,
	action as signupAction,
} from "./pages/auth/Signup/SignUp";

import { Suspense, lazy } from "react";
import { UserConextProvider } from "./contexts/userContext";
import Menu, { loader as menuLoader } from "./pages/menu/menu";

const About = lazy(() => import("./pages/About/About"));
import UserProfile, {
	loader as profileLoader,
} from "./pages/auth/profile/UserProfile";
import Login, {
	Loader as auth,
	action as loginAction,
} from "./pages/auth/login/login";
import CreateNewBurger, {
	loader as CreateNewBurgerLoader,
	action as CreateNewBurgerAction,
} from "./pages/menu/children/createNew/createNew";
function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<UserConextProvider>
					<Root />
				</UserConextProvider>
			),
			errorElement: (
				<h2>
					some error has occured refresh the page or go to :
					<Link
						to="/"
						className=" border-current text-white border-4 py-1 px-3 rounded-full font-bold mt-3 capitalize lg:text-yellow-500"
					>
						home page
					</Link>
				</h2>
			),
			children: [
				{
					element: <Home />,
					index: true,
				},
				{
					path: "/about",
					element: (
						<Suspense fallback={<h2 className="mt-10">loading....</h2>}>
							<About />
						</Suspense>
					),
				},
				{
					path: "/menu",
					loader: menuLoader,
					element: <Menu />,
				},
				{
					path: "/signup",
					action: signupAction,
					loader: isAuth,
					element: <SignUp />,
				},
				{
					path: "/login",
					action: loginAction,
					loader: auth,
					element: <Login />,
				},
				{
					path: "/UserProfile",
					loader: profileLoader,
					element: <UserProfile />,
				},
				{
					path: "/menu/createNew",
					action: CreateNewBurgerAction,
					loader: CreateNewBurgerLoader,
					element: <CreateNewBurger />,
				},
			],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}
export default App;
