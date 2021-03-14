import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || <Link href="/enter">You must be signed in</Link>;
}

// props.children are the component that will show if auth is succesful
// props.fallback is what will be shown if the user is not authenticated
