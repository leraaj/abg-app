import { useMemo } from "react";

const useFormattedDate = (date) => {
  return useMemo(() => {
    return date
      ? new Date(date)
          .toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
          .toUpperCase()
          .replace(/ /g, "-")
          .replace(",", "")
      : "XXX-XX-XXXX";
  }, [date]);
};

export default useFormattedDate;
