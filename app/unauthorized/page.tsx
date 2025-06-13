import React from "react";

export default function Unauthorized() {
  return (
    <div className="text-center p-4">
      <h1 className="text-4xl">Unauthorized 401</h1>
      <h1 className="text-3xl text-red-500">
        Oopsies! Looks like you <b>do not</b> have access to that page.
      </h1>
    </div>
  );
}
