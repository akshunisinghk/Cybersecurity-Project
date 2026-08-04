import { useEffect, useState } from "react";

import {
  getAnalyticsCards,
  type AnalyticsCardsData,
} from "../../services/analytics";

const AnalyticsCards = () => {
  const [data, setData] = useState<AnalyticsCardsData | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getAnalyticsCards();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch analytics cards:", error);
      }
    };

    fetchCards();
  }, []);

  if (!data) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="text-white">Loading...</div>
      </div>
    );
  }


 return (
  <div className="text-white text-3xl p-10">
    Analytics Working
  </div>
);
};

export default AnalyticsCards;