import React from "react";
import woodenTexture from '../../assets/wooden-texture.jpg';

const OrderedDone = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center text-center"
      style={{ backgroundImage: `url(${woodenTexture})` }}
    >
      <h1 className="text-white text-4xl md:text-6xl font-bold shadow-lg">
        Sikeres rendelés!
      </h1>
    </div>
  );
};

export default OrderedDone;
