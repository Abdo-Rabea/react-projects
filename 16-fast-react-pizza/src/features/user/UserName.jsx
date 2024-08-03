import { useSelector } from "react-redux";

function UserName() {
  const { username } = useSelector((store) => store.user);

  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default UserName;
