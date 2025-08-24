"use client";

import { AddTable } from "@/feature/AddTable";
import { Tables } from "@/feature/Tables";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:py-20 sm:px-10">
      <main className="">
        <div className="flex gap-4">
          <AddTable />
          {/* <EditTable /> */}
        </div>
        <Tables />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
