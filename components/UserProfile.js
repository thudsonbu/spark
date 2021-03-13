import { useContext } from "react";
import { UserContext } from "../lib/context";

// UI component for user profile
export default function UserProfile({ dbuser }) {
  const { user } = useContext(UserContext);

  return (
    <div className="box-center">
      <img src={user?.photoURL || null} className="card-img-center" />
      <p>
        <i>@{dbuser.username}</i>
      </p>
      <h1>{dbuser.displayName || "Anonymous User"}</h1>
    </div>
  );
}
