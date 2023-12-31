import React from "react";

const DefaultLayoutHoc =
  (Components) =>
  ({ ...props }) => {
    return (
      <>
        <div className="relative w-full overflow-x-hidden">
          <Components {...props} />
        </div>
      </>
    );
  };

export default DefaultLayoutHoc;
