import CartItems from "../Components/CartItems";

const Cart = () => {
    return(
       <div className="flex-grow-1 d-flex flex-column justify-content-center">
            <h1 className="text-purple mb-4">Shopping Cart</h1>
            <h4 className="mb-4 ">The items you have selected will be displayed below:</h4>
            <CartItems />
       </div>
    );
}

export default Cart;