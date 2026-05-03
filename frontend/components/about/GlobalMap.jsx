"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* Numeric ISO-3166 country IDs to highlight */
const HIGHLIGHTED = new Set([
  "356", // India
  "784", // UAE
  "682", // Saudi Arabia
  "634", // Qatar
  "414", // Kuwait
  "512", // Oman
  "826", // UK
  "276", // Germany
  "528", // Netherlands
  "250", // France
  "380", // Italy
  "724", // Spain
  "620", // Portugal
  "840", // USA
  "124", // Canada
  "036", // Australia
  "554", // New Zealand
  "702", // Singapore
  "458", // Malaysia
  "392", // Japan
  "710", // South Africa
  "404", // Kenya
  "566", // Nigeria
]);

const LABELS = [
  { name: "Canada",       coords: [-106,  56]   },
  { name: "USA",          coords: [-99,   39]   },
  { name: "UK",           coords: [-2,    54]   },
  { name: "Germany",      coords: [10,    51]   },
  { name: "Netherlands",  coords: [5.5,   52.5] },
  { name: "France",       coords: [2.5,   47]   },
  { name: "Spain",        coords: [-3.7,  40]   },
  { name: "Portugal",     coords: [-8,    39.5] },
  { name: "Italy",        coords: [12.5,  42]   },
  { name: "UAE",          coords: [54,    24]   },
  { name: "Saudi Arabia", coords: [45,    24]   },
  { name: "Qatar",        coords: [51,    25.5] },
  { name: "Kuwait",       coords: [47.5,  29.3] },
  { name: "Oman",         coords: [56,    21]   },
  { name: "India",        coords: [79,    22]   },
  { name: "Singapore",    coords: [104,   1.3]  },
  { name: "Malaysia",     coords: [102,   4]    },
  { name: "Japan",        coords: [138,   36]   },
  { name: "Australia",    coords: [134,  -25]   },
  { name: "New Zealand",  coords: [172,  -41]   },
  { name: "South Africa", coords: [25,   -29]   },
  { name: "Kenya",        coords: [38,    0]    },
  { name: "Nigeria",      coords: [8,     9]    },
];

const REGIONS = [
  { name: "India",          note: "Our heartland & headquarters"           },
  { name: "Middle East",    note: "UAE, Saudi Arabia, Qatar, Kuwait, Oman" },
  { name: "Europe",         note: "UK, Germany, France, Italy, Spain"      },
  { name: "USA & Americas", note: "USA, Canada — coast to coast"           },
];

export default function GlobalMap() {
  return (
    <section className="bg-secondary/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-burnt">
            From our kitchen to yours
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-[#1a1a1a] sm:text-5xl">
            India's Snack Legacy, Now Worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            WIN-DIA travels across continents — carrying a piece of home
            wherever it goes.
          </p>
        </div>

        {/* Map container */}
        <div className="overflow-hidden rounded-sm bg-[oklch(0.97_0.015_85)] p-2 shadow-sm md:p-6">
          <ComposableMap
            projectionConfig={{ scale: 155 }}
            width={980}
            height={500}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isHighlighted = HIGHLIGHTED.has(geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill:        isHighlighted ? "oklch(0.58 0.17 45)" : "oklch(0.9 0.02 80)",
                          stroke:      "oklch(0.975 0.018 85)",
                          strokeWidth: 0.5,
                          outline:     "none",
                        },
                        hover: {
                          fill:    isHighlighted ? "oklch(0.52 0.18 45)" : "oklch(0.85 0.03 80)",
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {LABELS.map(({ name, coords }) => (
              <Marker key={name} coordinates={coords}>
                <g transform="translate(0, -10)">
                  <rect
                    x={-(name.length * 3 + 6)}
                    y={-8}
                    width={name.length * 6 + 12}
                    height={14}
                    rx={3}
                    fill="oklch(0.82 0.15 80)"
                    stroke="oklch(0.65 0.14 70)"
                    strokeWidth={0.4}
                  />
                  <text
                    textAnchor="middle"
                    y={2}
                    style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize:   8,
                      fontWeight: 600,
                      fill:       "oklch(0.25 0.05 50)",
                    }}
                  >
                    {name}
                  </text>
                </g>
                <circle r={1.2} fill="oklch(0.35 0.08 50)" />
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Region legend */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((r) => (
            <div
              key={r.name}
              className="bg-[#faf7f2] p-6 transition hover:bg-turmeric/20"
            >
              <p className="font-display text-xl font-semibold text-[#1a1a1a]">
                {r.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">{r.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
