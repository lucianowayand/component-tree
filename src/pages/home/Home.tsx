import { Box } from "@mui/material";
import { Header } from "./components/Header";
import { useFetchCompanies } from "./hooks/useFetchCompanies";

export const Home = () => {
  const { companies, selectedCompany, setSelectedCompany } =
    useFetchCompanies();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        companies={companies}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
    </Box>
  );
};
