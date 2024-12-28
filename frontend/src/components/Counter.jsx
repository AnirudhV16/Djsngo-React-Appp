import React, { useState } from "react";

const Counter = ({ children }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="counter">
      <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
      {children(quantity)}
    </div>
  );
};

export default Counter;
