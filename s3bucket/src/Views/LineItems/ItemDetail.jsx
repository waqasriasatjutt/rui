import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Loader } from "../../components";
import DotsLoader from "../../components/atoms/DotsLoader";
import { get_proof_status } from "../../redux/ordersSlice";
import api from "../../services/api";
import AddProofs from "./AddProofs";

function ItemDetail() {
  const { proofStatus } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const params = useParams();
  const { id } = params;
  const [isLoader, setIsLoader] = useState(false);
  const [isProof, setIsProof] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const dispatch = useDispatch();
  const cancelFormHandler = () => {
    setEditingRecord(null);
    setIsProof(false);
  };
  const openProofFormHandler = (record) => () => {
    setEditingRecord({...record, line_item_id:id});
    setIsProof(true);
  };

  const getData = async () => {
    setIsLoader(true);
    try {
      const res = await api.get(`/api/line_items/line_item_detail/${id}`);
      setIsLoader(false);
      setRecord(res.data);
    } catch (err) {
      setIsLoader(false);
      console.log("🚀 ~ file: index.jsx:48 ~ getData ~ err:", err);
    }
  };
  React.useEffect(() => {
    getData();
    dispatch(get_proof_status());
    // dispatch(get_order_detail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangePaymentStatus = async ({ status_id, proof_number }) => {
    setIsLoader(true);
    try {
      const res = await api.post(`/api/update_proof_status`, {
        status_id,
        proof_number,
      });
      if (res.status === 200) {
        toast.success("Proof status update successfully");
        getData();
      } else {
        toast.error("Proof status couldn't be updated");
      }
      setIsLoader(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: index.jsx:65 ~ handleChangeStatus ~ error:",
        error
      );
      setIsLoader(false);
      toast.error("Proof status couldn't be updated");
    }
  };
  return (
    <div className="p-3">
      {isProof && (
        <AddProofs
          editingRecord={editingRecord}
          modalTitle="Add Proofs"
          onCancelForm={cancelFormHandler}
          getData={getData}
        />
      )}
      {isLoader?<DotsLoader/>:null}
      <div className="w-full flex flex-col justify-center items-center mb-3">
        {record?.comments?.length > 0 ? (
          <span className="border p-2 mb-3 border-[#00bcd4] bg-[#00bcd4]/10 rounded">
            {record?.comments[0]?.comment}
          </span>
        ) : null}

        {record?.proof_number ? (
          <div className="relative">
            <img
              src={record?.url}
              alt=""
              className="h-72 w-72 border rounded-md"
            />
            <div
              className={`absolute top-0 left-0 w-auto h-5 p-1 pr-2 rounded-r-full border-solid text-white flex justify-start items-center ${
                record?.status_id === 1
                  ? "bg-blue-500"
                  : record?.status_id === 2
                  ? "bg-green-500"
                  : record?.status_id === 3
                  ? "bg-red-500"
                  : "bg-primary-100"
              }`}
            >
              <small>
                {proofStatus?.find(({ id }) => id === record?.status_id)?.name}
              </small>
            </div>
          </div>
        ) : (
          <div className="h-72 w-72 border rounded-md flex justify-center items-center text-lg font-bold">
            No Proof...
          </div>
        )}
        {record?.status_id === 1 ? (
          <>
            <Button
              text="Approve"
              variant="btn_submit"
              className="mt-3 w-64 !rounded-md"
              onClick={() =>
                handleChangePaymentStatus({
                  status_id: proofStatus?.find(
                    ({ name }) => name === "Approved"
                  )?.id,
                  proof_number: record?.proof_number,
                })
              }
            />
            <span>
              or{" "}
              <span className="text-blue-600 cursor-pointer hover:underline"
              onClick={() =>
                handleChangePaymentStatus({
                  status_id: proofStatus?.find(
                    ({ name }) => name === "Rejected"
                  )?.id,
                  proof_number: record?.line_item_id,
                })
              }
              >
                request for change
              </span>
            </span>
          </>
        ) : null}
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
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={openProofFormHandler(record)}
          >
            Add Proof
          </span>
        </div>
      </div>
      <div className="w-full mt-3 overflow-y-auto border rounded-md bg-gray-100">
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-semibold mb-4">History</h1>
          <div className="flex justify-center flex-col">
            {record?.comments?.length > 0 ? (
              record?.comments?.map(
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
