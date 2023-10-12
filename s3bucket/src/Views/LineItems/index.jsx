import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components";
import DotsLoader from "../../components/atoms/DotsLoader";
import api from "../../services/api";
import AddItems from "./AddItems";

function OrderDetail() {
  const params = useParams();
  const { id } = params;
  const [isNew, setIsNew] = useState(false);
  const [record, setRecord] = useState([]);
  const [isLoader, setIsLoader]=useState(false)
  const cancelFormHandler = () => {
    setIsNew(false);
  };

  // pending for future implementation
  const openFormHandler = (record) => () => {
    setIsNew(true);
  };
  const Card = ({ item }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 flex">
        {/* Left Section (Image) */}
        <div className="w-full flex flex-row">
          <img src={item.image} alt={item.name} className="w-[100px] h-auto" />
          {/* Middle Section (Item Details) */}
          <div className="px-4 ml-10">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">Size: {item.size}</p>
            <p className="text-gray-600">Qty: {item.qty}</p>
            <span className="text-blue-600 cursor-pointer hover:underline">
              View Proof
            </span>
          </div>
        </div>

        {/* Right Section (Price) */}
        <div className="w-1/4 text-right">
          <p className="text-2xl font-semibold">${item?.price*item?.qty}</p>
        </div>
      </div>
    );
  };
  const getData = async () => {
    setIsLoader(true)
    try {
      const res = await api.get(`/api/add_items/${id}`);
      console.log("🚀 ~ file: index.jsx:49 ~ getData ~ res:", res);
      setIsLoader(false)
      setRecord(res.data);
    } catch (err) {
      setIsLoader(false)
      console.log("🚀 ~ file: index.jsx:48 ~ getData ~ err:", err);
    }
  };
  React.useEffect(() => {
    getData();
    // dispatch(get_order_detail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
       {isLoader?<DotsLoader/>:null}
      {isNew && (
        <AddItems
          editingRecord={{ order_number: id }}
          modalTitle="Add Items"
          onCancelForm={cancelFormHandler}
          refreshData={getData}
        />
      )}
      
      <header className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-bold ml-5">Order {id}</span>
          <span className="text-lg font-semibold text-gray-400 ml-5">
            Order Discription
          </span>
        </div>
        <Button
          text="Add Item"
          variant="btn_submit"
          className="h-[36px]"
          onClick={openFormHandler(0)}
        />
      </header>
     
      <div className="border-y grid grid-cols-2 gap-3">
        {record?.map((item, index) => {
          return (
            <Fragment key={index}>
              <Card item={item} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default OrderDetail;
