import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DotsLoader from "../../components/atoms/DotsLoader";
import ThumbnailSlider from "../../components/molecules/Slider";
import { create_comments, get_comments } from "../../redux/ordersSlice";

const CommentForm = ({ orderNumber, commentBy, name }) => {
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;
  const intialPayload = {
    name: "",
    comment_by: commentBy ? "Customer" : "Staff",
    comment: "",
    order_number: orderNumber,
  };
  const [payload, setPayload] = useState(intialPayload);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(create_comments({...payload, name: commentBy ? name : user?.username ? user?.username : ""}));
      if (res.payload.status === 201) {
        toast.success("Comment submited successfully");
        setPayload(intialPayload);
      }
    } catch (err) {
      console.log("🚀 ~ file: Comments.jsx:25 ~ handleSubmit ~ err:", err);
      toast.error(err?.payload ? err.payload : "Getting an error");
    }
  };
  const title=commentBy ? name : user?.username
  const text = title
    ? title
        .replaceAll("+", "")
        .split(" ")
        .slice(0, 2)
        .map((string) => (string ? string[0].toUpperCase() : ""))
    : "";
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 w-full border bg-gray-50 p-1.5"
    >
      <div className="flex flex-row border items-center p-1.5 w-full rounded bg-white">
        <div className="bg-gray-400 text-white rounded w-6 h-6 flex justify-center items-center text-xs">
          <span>{text}</span>
        </div>
        <div className="ml-2 w-full">
          <input
            placeholder="Leave a comment..."
            value={payload.comment}
            onChange={(e) =>
              setPayload({ ...payload, comment: e.target.value })
            }
            className="w-full rounded text-xs focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="bg-primary-100 text-white px-2 py-1.5 rounded hover:bg-primary-50 text-xs"
        >
          Post
        </button>
      </div>
    </form>
  );
};
function Comments() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id, type } = params;
  const { comments, isLoading } = useSelector((state) => state.orders);
  console.log("🚀 ~ file: Comments.jsx:76 ~ Comments ~ ordersDetail:", comments)
  useEffect(() => {
    dispatch(get_comments(id));
    // dispatch(get_order_detail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCommentSubmit = (comment) => {
    dispatch(create_comments(comment));
    // setComments([...comments, comment]);
  };
  function makeUrlsClickable(comment) {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
  
    // Split the comment text into an array of substrings
    const parts = comment.split(urlRegex);
  
    // Map the parts and wrap URLs with anchor tags
    const formattedComment = parts.map((part, index) => {
      if (part.match(urlRegex)) {
        // Wrap URLs with anchor tags
        return (
          <>
          <br/>
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Show Image
          </a>
          </>
        );
      } else {
        // Keep non-URL parts as text
        return part;
      }
    });
  
    // Return the formatted comment as JSX
    return formattedComment;
  }
  
  
  return (
    <div>
      {isLoading?<DotsLoader/>:null}
      <div className=" mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Comments</h1>
        <ThumbnailSlider images={type?[comments?.active_image]:comments?.images} activeImage={comments?.active_image} order_number={id} isCustomer={!!type} />
        <CommentForm
          onCommentSubmit={handleCommentSubmit}
          orderNumber={id}
          commentBy={type}
          name={comments?.customer_name?comments?.customer_name:''}
          isCustomer={!!type}
        />
        <div className="w-full mt-3 h-[70vh] overflow-y-auto border rounded">
          <div className="p-4 space-y-4">
            {comments?.comments?.map(({ name, comment_by, createdAt, comment }) => {
              return (
                <div className="border-b pb-4 mb-4">
                  <div className="font-semibold">{`Comment by: ${
                    comment_by==="Customer"?comment_by:
                    name ? name : ""
                  }`}</div>
                  <div className="text-gray-600">{`Comment Date: ${dayjs(createdAt).format("ddd, MMM D, YYYY h:mm A")}`}</div>
                  <div className="mt-2">{makeUrlsClickable(comment)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
