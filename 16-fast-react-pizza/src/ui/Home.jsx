import CreateUser from "../features/user/CreateUser.jsx";
function Home() {
  return (
    <div className="my-10 px-4 text-center">
      <h1 className="mb-8 text-xl font-semibold">
        The best pizza.
        <br />
        <span className="font-semibold text-yellow-500 md:text-3xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
