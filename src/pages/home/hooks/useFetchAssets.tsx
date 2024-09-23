import { useEffect, useState } from "react";
import { api } from "../../../services/axios";
import { Asset } from "../../../dto/assets.dto";

export const useFetchAssets = ({ companyId }: { companyId?: string }) => {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (!companyId) return;
    setLoading(true);
    api
      .get(`/companies/${companyId}/assets`)
      .then(({ data }) => {
        setAssets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setLoading(false);
      });
  }, [companyId]);

  return { loading, assets };
};
