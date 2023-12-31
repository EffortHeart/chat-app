import React from "react";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { Button } from "./Button";

const Social = () => {
  return (
    <Wrapper className="mt-6 text-center">
      <div className="signin-other-title flex flex-col">
      <span className="text-gray-500">or</span>
        <h5 className="mb-4 title font-semibold">Sign in With</h5>
      </div>
      <div className="grid grid-rows-1 grid-flow-col gap-3 bg-gray-600">
        <div>
          <Button
            className="btn-light flex justify-center items-center w-full"
            type="Button"
            id="google"
            title="google"
          >
            <FcGoogle className="text-xl" />
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
`;

export default Social;
