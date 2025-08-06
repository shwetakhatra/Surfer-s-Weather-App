import { useState, useEffect, useRef } from "react";

interface City {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface SearchBarProps {
  theme: "light" | "dark";
  onSelectCity: (city: City) => void;
}

const GEO_DB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

const SearchBar: React.FC<SearchBarProps> = ({ theme, onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    if (!query) {
      setCities([]);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setLoading(true);
      fetch(
        `${GEO_DB_API_URL}?namePrefix=${encodeURIComponent(query)}&limit=10`,
        {
          headers: {
            "X-RapidAPI-Key":
              "c3c2c9b66fmsh725c13235ec2587p1fbb55jsnc8f9496755d6",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(
            data.data.map((c: any) => ({
              id: c.id,
              city: c.name,
              country: c.country,
              latitude: c.latitude,
              longitude: c.longitude,
            })),
          );
          setLoading(false);
        })
        .catch(() => {
          setCities([]);
          setLoading(false);
        });
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const handleSelect = (city: City) => {
    setQuery(`${city.city}, ${city.country}`);
    setShowList(false);
    onSelectCity(city);
  };

  return (
    <div className={`relative rounded-md shadow p-4 ${
        isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
      }` }>
      <input
        type="text"
        placeholder="Search for city"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 150)}
        className={`w-full px-4 py-2 rounded-md border ${
          isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
        } border-gray-300`}
      />
      {showList && (
        <ul
          className={`absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border ${
            isDark
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          {loading ? (
            <li className="px-4 py-2">Loading...</li>
          ) : cities.length === 0 ? (
            <li className="px-4 py-2">No cities found</li>
          ) : (
            cities.map((city) => (
              <li
                key={city.id}
                className="cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
                onMouseDown={() => handleSelect(city)}
              >
                {city.city}, {city.country}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
