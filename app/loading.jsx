import React from "react";
import { BiLoader } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="animate-spin max-w-md container w-full mx-auto items-center justify-center">
      <div>
        <BiLoader />
      </div>
    </div>
  );
}
