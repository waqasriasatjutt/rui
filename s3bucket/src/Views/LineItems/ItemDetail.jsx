import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import api from "../../services/api";
import AddProofs from "./AddProofs";

function ItemDetail() {
  const { comments, isLoading } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isProof, setIsProof] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  console.log("🚀 ~ file: ItemDetail.jsx:16 ~ ItemDetail ~ editingRecord:", editingRecord)
  const cancelFormHandler = () => {
    setEditingRecord(null);
    setIsProof(false);
  };
  const openProofFormHandler = (record) => () => {
    setEditingRecord(record);
    setIsProof(true);
  };
  const params = useParams();
  const { id } = params;
  const getData = async () => {
    setIsLoader(true);
    try {
      const res = await api.get(`/api/line_items/line_item_detail/${id}`);
      console.log("🚀 ~ file: index.jsx:49 ~ getData ~ res:", res);
      setIsLoader(false);
      setRecord(res.data);
    } catch (err) {
      setIsLoader(false);
      console.log("🚀 ~ file: index.jsx:48 ~ getData ~ err:", err);
    }
  };
  React.useEffect(() => {
    getData();
    // dispatch(get_order_detail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-3">
              {isProof && (
        <AddProofs
          editingRecord={editingRecord}
          modalTitle="Add Proofs"
          onCancelForm={cancelFormHandler}
        />
      )}
      <div className="w-full flex flex-col justify-center items-center mb-3">
        <span className="border p-2 mb-3 border-[#00bcd4] bg-[#00bcd4]/10 rounded">
          We adjusted the size to 3" x 2.44"
        </span>
        <img
          src={record?.image}
          alt=""
          className="h-72 w-72 border rounded-md"
        />
        <Button
          text="Approve"
          variant="btn_submit"
          className="mt-3 w-64 !rounded-md"
        />
        <span>
          or{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            request for change
          </span>
        </span>
      </div>
      <div className="border w-full flex flex-ro justify-between space-x-4 p-3 font-semibold text-sm rounded-md bg-gray-100">
        <div className="flex flex-ro justify-between w-2/3">
          <div>
            <span>Order</span>
            <span
              className="ml-1 cursor-pointer text-blue-600 hover:underline"
              onClick={() =>
                navigate(`/orders/order_detail/${record?.order_number}`)
              }
            >
              {record?.order_number}
            </span>
          </div>

          <span>{record?.title}</span>
          <span>{record?.size}</span>
          <span>
            {record?.price * record?.qty} for {record?.qty}
          </span>
        </div>
        <div>
          <span className="cursor-pointer text-blue-600 hover:underline"
          onClick={openProofFormHandler(record)}
          >
            Add Proof
          </span>
        </div>
      </div>
      <div className="w-full mt-3 overflow-y-auto border rounded-md bg-gray-100">
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-semibold mb-4">History</h1>
          <div className="flex justify-center">
            {comments?.comments?.length > 0 ? (
              comments?.comments?.map(
                ({ name, comment_by, createdAt, comment }) => {
                  return (
                    <div className="border-b pb-4 mb-4">
                      <div className="font-semibold">{`Comment by: ${
                        comment_by === "Customer"
                          ? comment_by
                          : name
                          ? name
                          : ""
                      }`}</div>
                      <div className="text-gray-600">{`Comment Date: ${dayjs(
                        createdAt
                      ).format("ddd, MMM D, YYYY h:mm A")}`}</div>
                      <div className="mt-2">{comment}</div>
                    </div>
                  );
                }
              )
            ) : (
              <h1>No record found...</h1>
            )}
          </div>

          {}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
