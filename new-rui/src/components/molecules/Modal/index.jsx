import React, { useRef } from "react";
import Button from "../../atoms/Button";
function useVisible(onCancelModal) {
  const modalRef = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      onCancelModal();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancelModal();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { modalRef };
}

const Modal = (props) => {
  const { modalRef } = useVisible(props?.onClick);

  return (
    <div className="w-full h-screen z-[100] fixed top-0 left-0 opacity-100 bg-black/[0.75] flex items-center justify-center">
      <div
        className="z-10 w-auto w-full md:max-w-[1024px] md:min-w-[730px] max-h-[calc(100vh-130px)] overflow-y-auto bg-neutral-100 p-3.5 border-[10px] border-white"
        ref={modalRef}
      >
        <div className="pt-0 max-w-[994px] h-full px-3.5 m-auto">
          {!props.hideHeader && (
            <header className="bg-black h-[60px] flex items-center justify-center shadow-lg">
              <h1 className=" text-2xl text-white m-4 font-medium">
                {props.isUpdate
                  ? props.title.replaceAll("Add", "Edit")
                  : props.title}
              </h1>
            </header>
          )}
          {/* #f3804e */}
          {/* #f26324 */}
          <div className="md:p-4">{props.children}</div>
          {/* <div className="flex flex-row w-full justify-between"> */}
            {/* <div className="w-2/3 !p-4">Hlo errors</div> */}
          {!props.hideButtons && (
            <div className="!p-4 text-right">
              <Button
                text="Cancel"
                className="mx-2 text-white bg-blue-700 hover:bg-blue-800"
                onClick={props.onCancelModal}
                variant="btn_cancel"
              />
              {
                props.hideSubmit?null:
                <Button
                text={"Submit"}
                className="text-white bg-blue-700 hover:bg-blue-800"
                onClick={props.onSubmit}
                isLoading={props?.isLoading}
                variant="btn_submit"
              />
              }
              
            </div>
            
          )}
          {props.CloseOnly && (
            <div className="!p-4 text-right">
              <Button
                text="Cancel"
                className="mx-2 text-white bg-blue-700 hover:bg-blue-800"
                onClick={props.onCancelModal}
                variant="btn_cancel"
              />
            </div>
            
          )}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};
export default Modal;
