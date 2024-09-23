import { useEffect, useState } from "react";
import { api } from "../../../services/axios";
import { Company } from "../../../dto/companies.dto";

export const useFetchCompanies = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company>();

  useEffect(() => {
    api
      .get("/companies")
      .then((response) => {
        setCompanies(response.data);
        setSelectedCompany(response.data[0]);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return { loading, companies, selectedCompany, setSelectedCompany };
};
