import { Link } from "react-router-dom";
// useCase: you have button and link that you want to have same styling with different functionalities

const base =
  "rounded-full text-sm bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 outline-none ring-yellow-300 transition-colors duration-300 hover:bg-yellow-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed inline-block";
const style = {
  primary: base + " px-4 py-3 md:px-6 md:py-4",
  small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
  round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm ",
  secondary:
    "rounded-full text-sm border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 outline-none ring-stone-300 transition-colors duration-300 hover:bg-stone-300 focus:ring hover:text-stone-800 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed inline-block  px-4 py-2.5 md:px-6 md:py-3.5", // py-0.5 = 2px; border-2 = 2px
};

/**
 *
 * @param {type} primary - small - secondary
 * @returns
 */
function Button({ children, disabled, to, type, onClick }) {
  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button disabled={disabled} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

export default Button;
