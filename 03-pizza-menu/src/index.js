import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

// it is a convension to call it App but it has to start with capital
function App() {
    // main component
    // you can write in js here

    return (
        // component always return jsx to describe the appearance of component based on data and logic
        <div>
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    // jsx
    return (
        <div className="header">
            <h1>Fast React Pizza Co.</h1>
        </div>
    );
    // return React.createElement("h1", null, "Fast React Pizza Co."); pure react with no BABEL
}

function Menu() {
    // const style = { color: "red", fontSize: "40px" };
    const pizzas = pizzaData;
    let pizzasNum = pizzaData.length;
    // pizzasNum = 0;
    console.log(pizzasNum);
    return (
        <main className="menu">
            <h2 style={{}}>Our menu</h2>

            {/* 46. Rendering Lists */}
            {pizzasNum ? (
                // in this scope it must return one root element of jsx so use fragment
                <React.Fragment key="unique">
                    <p>
                        you have 6 dishes you can choose from. they are very
                        delicious dishes. you have 6 dishes you can choose from.
                        they are very delicious dishes
                    </p>
                    <ul className="pizzas">
                        {pizzas.map(function (pizza) {
                            return <Pizza pizzaObj={pizza} key={pizza.name} />;
                        })}
                    </ul>
                </React.Fragment>
            ) : (
                <p>we are working on the menu. come visit us later :)</p>
            )}
            {/* wow this works {[
                <Pizza
                    name="Pizza1 Spinaci"
                    ingredients="Tomato, mozarella, spinach, and ricotta cheese"
                    photoName="pizzas/spinaci.jpg"
                    price={10}
                />,
                <Pizza
                    name="Pizza Funghi"
                    ingredients="Tomato, mozarella, mushrooms, and onion"
                    photoName="pizzas/funghi.jpg"
                    price={12}
                />,
            ]} */}
        </main>
    );
}

function Pizza({ pizzaObj }) {
    // console.log(props);
    // if (pizzaObj.soldOut) return null;
    return (
        <li className={`pizza${pizzaObj.soldOut ? " sold-out" : ""}`}>
            <img src={pizzaObj.photoName} alt={pizzaObj.name} />
            <div>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredients}</p>
                {/* here you know the element but you don't know the content */}
                <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
            </div>
        </li>
    );
}

function Footer() {
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;
    console.log(isOpen);

    return (
        <footer className="footer">
            {isOpen ? (
                <Order closeHour={closeHour} openHour={openHour} />
            ) : (
                <p>
                    we are happy to welcome you between {openHour}:00 and{" "}
                    {closeHour}:00
                </p>
            )}
        </footer>
    );
}
// extracting jsx into new component
function Order({ closeHour, openHour }) {
    return (
        <div className="order">
            <p>
                we are open from {openHour}:00 to {closeHour}:00. come visit us
                or order online
            </p>
            <button className="btn">Order</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
