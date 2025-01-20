import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { isPending, logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <ButtonIcon onClick={handleLogout} disabled={isPending}>
      {isPending ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
