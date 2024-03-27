import { logout } from "@/lib/logout";

export default async function LogOut() {
	return (
		<form action={logout}>
			<button>Sign out</button>
		</form>
	);
}