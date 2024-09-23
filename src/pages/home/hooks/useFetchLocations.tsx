import { useEffect, useState } from "react";
import { api } from "../../../services/axios";
import { Location } from "../../../dto/locations.dto";

export const useFetchLocations = ({ companyId }: { companyId?: string }) => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    api
      .get(`/companies/${companyId}/locations`)
      .then(({ data }) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setLoading(false);
      });
  }, [companyId]);

  return { loading, locations };
};
