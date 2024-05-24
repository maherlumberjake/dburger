import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { axioslocal } from "../pages/auth/Signup/SignUp";
import { AxiosError } from "axios";

type User = {
	user: {
		status?: string;
		user: {
			name: string;
			email: string;
			thumbnailImg: string;
		};
	};
	error: AxiosError | null;
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
	const [error, setError] = useState<AxiosError | null>(null);
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
			.catch((err: AxiosError) => {
				if (err.message == "Request failed with status code 401") {
					setAuth(false);
					setLoading(false);
				} else setLoading(false);
			})
			.finally(() => setLoading(false));
	}, [auth]);
	useMemo(() => {
		if (!localStorage.getItem("jwt")) {
			setAuth(false);
			setError(null);
		}
		setAuth(true);
	}, []);
	const sent: User = {
		auth,
		loading,
		setAuth,
		user,
		error,
	};
	return <userContext.Provider value={sent}>{children}</userContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
	const sent = useContext<null | User>(userContext);
	return sent;
};
