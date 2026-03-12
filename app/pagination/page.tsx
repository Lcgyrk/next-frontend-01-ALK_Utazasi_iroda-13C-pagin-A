"use client";

import axios from "axios";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/globalStore";

export type JourneyItem = {
  id: number;
  vehicle: Vehicle;
  country: string;
  description: string;
  departure: string;
  capacity: number | null;
  pictureUrl: string;
};

export type Vehicle = {
  id: number;
  type: string;
};

export default function PaginationPage() {
  const [journeys, setJourneys] = useState<JourneyItem[]>([]);
  const { gs, set } = useGlobalStore();
  const limit: number = 4;

  useEffect(() => {
    async function getJourneys() {
      const filterParam = gs.searchTerm.trim() || "*";
      const res = await axios.get(
        `http://localhost:3000/api/journeys/${gs.actualPage}/${limit}/${encodeURIComponent(filterParam)}`,
      );
      setJourneys(res.data);

      // Get total record count from all journeys, then filter locally for counting
      const allRes = await axios.get("http://localhost:3000/api/journeys");
      const allData: JourneyItem[] = allRes.data;
      const totalRecords =
        filterParam === "*"
          ? allData.length
          : allData.filter((j) => j.description.toLowerCase().includes(filterParam.toLowerCase()))
              .length;

      const totalPages = Math.ceil(totalRecords / limit) || 1;
      set("numberOfRecords", totalRecords);
      set("numberOfPages", totalPages);
      set("actualPage", Math.min(gs.actualPage, totalPages));
    }
    getJourneys();
  }, [set, gs.searchTerm, gs.actualPage]);

  return (
    <div className="justify-top flex flex-col items-center">
      {/* Search input */}
      <div className="m-3">
        <label className="input">
          <Search className="input-icon" />
          <input
            placeholder="Keresés..."
            required
            type="search"
            value={gs.searchTerm}
            onChange={(e) => {
              set("searchTerm", e.target.value);
              set("actualPage", 1);
            }}
          />
        </label>
      </div>

      {/* Table of journeys */}
      <div className="mx-auto mt-4 w-[95%] overflow-x-auto rounded-lg border border-gray-600">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-400 bg-blue-200">
              <th className="px-3 py-2 text-left">Ország</th>
              <th className="px-3 py-2 text-left">Utazási mód</th>
              <th className="px-3 py-2 text-left">Indulás</th>
              <th className="px-3 py-2 text-right">Max. létszám</th>
              <th className="px-3 py-2 text-left">Leírás</th>
              <th className="px-3 py-2 text-center">Fénykép</th>
            </tr>
          </thead>
          <tbody>
            {journeys.map((journey) => (
              <tr className="border-b border-gray-400 bg-white" key={journey.id}>
                <td className="px-3 py-2">{journey.country}</td>
                <td className="px-3 py-2">{journey.vehicle.type}</td>
                <td className="px-3 py-2">{journey.departure}</td>
                <td className="px-3 py-2 text-right">{journey.capacity ?? "-"}</td>
                <td className="px-3 py-2 text-sm">{journey.description}</td>
                <td className="min-w-[250px] px-3 py-2">
                  <Image
                    alt={journey.country}
                    className="mx-auto h-[100px] w-auto rounded-xl shadow-lg"
                    height={100}
                    src={journey.pictureUrl}
                    width={200}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination buttons with lucide-react icons */}
      <div className="mt-4 flex items-center space-x-2">
        <button
          className="btn btn-primary"
          disabled={gs.actualPage === 1}
          title="Első oldal"
          onClick={() => set("actualPage", 1)}
        >
          <ChevronsLeft />
        </button>
        <button
          className="btn btn-primary"
          disabled={gs.actualPage === 1}
          title="Előző oldal"
          onClick={() => set("actualPage", gs.actualPage - 1)}
        >
          <ChevronLeft />
        </button>
        <span className="px-2 text-lg font-semibold">
          {gs.actualPage} / {gs.numberOfPages}
        </span>
        <button
          className="btn btn-primary"
          disabled={gs.actualPage === gs.numberOfPages}
          title="Következő oldal"
          onClick={() => set("actualPage", gs.actualPage + 1)}
        >
          <ChevronRight />
        </button>
        <button
          className="btn btn-primary"
          disabled={gs.actualPage === gs.numberOfPages}
          title="Utolsó oldal"
          onClick={() => set("actualPage", gs.numberOfPages)}
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
