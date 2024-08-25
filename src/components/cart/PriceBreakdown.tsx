import React from "react";

interface PriceBreakdownProps {
  cartItems: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  calculateTotalPrice: () => number;
  calculateTax: () => number;
  calculateFinalPrice: () => number;
  SERVICE_FEE: number;
  DISCOUNT: number;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  cartItems,
  calculateTotalPrice,
  calculateTax,
  calculateFinalPrice,
  SERVICE_FEE,
  DISCOUNT
}) => {
  return (
    <div className="p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold">Price Breakdown</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between py-2">
          <p>{item.title}</p>
          {/* <p>
            {item.quantity === 1
              ? `${item.quantity} day`
              : `${item.quantity} days`}
          </p> */}
          <p>
            ${item.price.toLocaleString()} x {item.quantity === 1
              ? `${item.quantity} day`
              : `${item.quantity} days`} = $
            {(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
      ))}

      <div className="flex justify-between py-2 border-t mt-4">
        <p>Subtotal:</p>
        <p>${calculateTotalPrice().toLocaleString()}</p>
      </div>
      <div className="flex justify-between py-2">
        <p>Service Fee:</p>
        <p>${SERVICE_FEE.toLocaleString()}</p>
      </div>
      <div className="flex justify-between py-2">
        <p>Discount:</p>
        <p>-${DISCOUNT.toLocaleString()}</p>
      </div>
      <div className="flex justify-between py-2">
        <p>Tax (8%):</p>
        <p>${calculateTax().toLocaleString()}</p>
      </div>
      <div className="total-price flex justify-between text-lg font-bold mt-4">
        <p>Total Price:</p>
        <p>${calculateFinalPrice().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PriceBreakdown;
