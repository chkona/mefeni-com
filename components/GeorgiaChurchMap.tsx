"use client";

import { useState } from "react";
import { churches, Church } from "@/lib/data/churches";

// სტილიზებული, არა-გეოგრაფიულად ზუსტი მონახაზი საქართველოს ფორმის შთაგონებით:
// ჩრდილოეთით კავკასიონის ქედის მოტივი, დასავლეთით შავი ზღვის ტალღოვანი ხაზი.
const OUTLINE =
  "M 4,18 C 10,10 18,8 26,12 C 32,6 40,9 46,6 C 54,3 62,7 68,5 " +
  "C 76,3 84,8 90,14 C 95,19 96,26 92,31 C 96,38 94,46 88,50 " +
  "C 92,58 90,67 84,72 C 86,80 80,88 72,90 " +
  "C 66,94 58,92 52,88 C 46,93 37,92 32,86 " +
  "C 24,88 16,82 13,74 C 8,70 5,62 8,54 " +
  "C 3,48 2,40 6,33 C 2,27 1,22 4,18 Z";

function MarkerPin({
  church,
  active,
  onSelect,
}: {
  church: Church;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <g
      className="cursor-pointer group"
      onClick={() => onSelect(church.slug)}
      role="button"
      aria-label={church.name}
    >
      <circle
        cx={church.x}
        cy={church.y}
        r={active ? 2.4 : 1.5}
        className={
          active
            ? "fill-goldBright stroke-wine"
            : "fill-wine stroke-goldBright/70 group-hover:fill-wineBright"
        }
        strokeWidth={0.4}
      />
      {active && (
        <text
          x={church.x}
          y={church.y - 3.2}
          textAnchor="middle"
          className="fill-goldBright font-body"
          style={{ fontSize: "2.6px" }}
        >
          {church.name}
        </text>
      )}
    </g>
  );
}

export default function GeorgiaChurchMap({
  onSelect,
  selected,
}: {
  onSelect: (slug: string) => void;
  selected: string | null;
}) {
  return (
    <div className="relative w-full rounded-lg border border-gold/20 bg-panel p-4">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ maxHeight: "70vh" }}
      >
        <path
          d={OUTLINE}
          className="fill-panel2 stroke-gold/60"
          strokeWidth={0.6}
        />
        {churches.map((c) => (
          <MarkerPin
            key={c.slug}
            church={c}
            active={selected === c.slug}
            onSelect={onSelect}
          />
        ))}
      </svg>
      <p className="text-center text-xs text-muted mt-2">
        რუკა სტილიზებულია და არ ასახავს ზუსტ გეოგრაფიულ საზღვრებს — მონიშნეთ
        წერტილი დეტალების სანახავად.
      </p>
    </div>
  );
}

