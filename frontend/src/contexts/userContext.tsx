import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { axioslocal } from "../pages/auth/Signup/SignUp";

type User = {
	user: {
		status?: string;
		user: {
			name: string;
			email: string;
			thumbnailImg: string;
		};
	};
	auth: boolean;
	loading: boolean;
	setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};
const userContext = createContext<null | User>(null);

export const UserConextProvider = ({ children }: { children: ReactNode }) => {
	axioslocal.defaults.headers.common.authorization = `Bearer ${localStorage.getItem(
		"jwt"
	)}`;
	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<{
		status: string;
		user: { name: string; email: string; thumbnailImg: string };
	}>({ status: "", user: { name: "", email: "", thumbnailImg: "" } });
	const [auth, setAuth] = useState(false);
	useEffect(() => {
		setLoading(true);
		axioslocal
			.get(`/profile`)
			.then((res) => {
				setUser(res.data);
				setLoading(false);
			})
			.catch(() => {
				setAuth(false);
				setLoading(false);
			})
			.finally(() => setLoading(false));
	}, [auth]);
	useMemo(() => {
		localStorage.getItem("jwt") ? setAuth(true) : setAuth(false);
	}, []);
	const sent: User = {
		auth,
		loading,
		setAuth,
		user,
	};
	return <userContext.Provider value={sent}>{children}</userContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
	const sent = useContext<null | User>(userContext);
	return sent;
};
