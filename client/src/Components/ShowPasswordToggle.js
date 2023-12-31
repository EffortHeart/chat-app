import React from "react";
import { useState } from "react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ShowPasswordToggle = () => {
    const [visible, setVisible] = useState(false);
    const InputType = visible ?  "text" : "password";
    
    const Icon = (
        <div className="input-suffix-end flex justify-center items-center h-full">
      <span className="cursor-pointer text-xl mb-0">
        {visible ? (
          <AiFillEye
            className="eye-icon-fill"
            onClick={() => setVisible(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="eye-icon-line"
            onClick={() => setVisible(true)}
          />
        )}
      </span>
    </div>
    )
    

  return [Icon, InputType];
};

export default ShowPasswordToggle;
