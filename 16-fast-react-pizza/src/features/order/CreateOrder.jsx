import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store.js";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username } = useSelector((store) => store.user);
  const cart = useSelector(getCart);

  const navigation = useNavigation(); // global access to what ever loading or submitting
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData(); // {phone: 'Please Enter valid phone number so that we can contact you if needed'}
  // const navigate = useNavigate();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.25 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  console.log(withPriority);
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="sm:flex-grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="sm:flex-grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// react-router pass the submitted request
export async function action({ request }) {
  // getting data from the form (react-router)
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  data = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  //* very good way to form validation
  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Please Enter valid phone number so that we can contact you if needed";
  }
  //todo: other form validations here (not really)
  if (Object.entries(errors).length > 0) return errors;

  // real fetch
  const order = await createOrder(data);

  //! don't overuse as it removes some of redux performance optimization (you can call dispatch anywhere not only in the component)
  //* i had to do so as you need to clearCart in redux after createOrder async called from react-router
  store.dispatch(clearCart());

  // react-router solution instead of useNavigate as action is just a function not Compononet
  return redirect(`/order/${order.id}`); //todo: what is that? A redirect response. Sets the status code and the Location header. Defaults to "302 Found".
}
export default CreateOrder;
