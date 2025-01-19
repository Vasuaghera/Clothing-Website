import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Orders = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );
      
      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 bg-black text-white">
      <div data-aos="zoom-in" className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => {
          const aosAnimation = index % 2 === 0 ? 'fade-left' : 'fade-right';

          return (
            <div
              key={index}
              data-aos={aosAnimation}
              className="py-6 border-t border-b border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 rounded-md shadow-lg"
                  src={item.image[0]}
                  alt={item.name}
                />
                <div>
                  <p className="sm:text-base font-medium text-white">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-300">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="mt-1">
                    Payment Method: <span className="text-gray-500">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <p className="text-sm md:text-base text-gray-400">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
