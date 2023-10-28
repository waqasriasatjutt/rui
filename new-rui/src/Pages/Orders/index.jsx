import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '../../components';
import { get_orders } from '../../redux/ordersSlice';
import DotsLoader from '../../components/atoms/DotsLoader';
import AddOrders from './AddOrders';

const OrderList = () => {
  const { orders, isLoading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOrders, setIsOrders] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  // Sample order data
  useEffect(() => {
    dispatch(get_orders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelFormHandler = () => {
    setEditingRecord(null);
    setIsOrders(false);
  };

  // pending for future implementation
  const openFormHandler = (record) => () => {
    setEditingRecord(record);
    setIsOrders(true);
  };

  return (
    <div className='p-4'>
      {isLoading || isLoader ? <DotsLoader /> : null}
      {isOrders && (
        <AddOrders
          editingRecord={editingRecord}
          modalTitle='Create Orders'
          onCancelForm={cancelFormHandler}
        />
      )}
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-2xl font-bold mb-4'>Order List</h1>
        <div className='flex flex-row items-center space-x-2'>
          {/* <Button
            variant='btn_submit'
            text='Create Order'
            className='text-white bg-blue-700 hover:bg-blue-800'
            onClick={openFormHandler(0)}
          /> */}

          <Link
            className='px-3 py-2 text-white bg-blue-700 hover:bg-blue-800'
            to='/add-order'>
            Add New Order
          </Link>
        </div>
      </div>

      <table className='min-w-full'>
        <thead>
          <tr>
            <th className='text-left'>Order number</th>
            <th className='text-left'>Name</th>
            <th className='text-left'>Email</th>
            <th className='text-left'>Address 1</th>
            <th className='text-left'>Address 2</th>
            <th className='text-left'>Suburb</th>
            <th className='text-left'>Postal Code</th>
            <th className='text-left'>State</th>
            <th className='text-left'>Created at</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td
                className='border px-4 py-2 text-blue-600 cursor-pointer hover:underline'
                onClick={openFormHandler(order)}>
                {order.id}
              </td>
              <td className='border px-4 py-2'>{order.name}</td>
              <td className='border px-4 py-2'>{order.email}</td>
              <td className='border px-4 py-2'>{order.address1}</td>
              <td className='border px-4 py-2'>{order.address2}</td>
              <td className='border px-4 py-2'>{order.suburb}</td>
              <td className='border px-4 py-2'>{order.postalCode}</td>
              <td className='border px-4 py-2'>{order.state}</td>
              <td className='border px-4 py-2'>
                {dayjs(order.createdAt).format('ddd, MMM D, YYYY h:mm A')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
