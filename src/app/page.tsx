import { Suspense } from "react";
import People from "./People";

export default async function Home() {
  return (
    <>
      <h1>People</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <People />
      </Suspense>
    </>
  );
}
