import { Box } from "@mui/material";
import { HeaderLogo } from "../../../assets/header-logo";
import { Company } from "../../../dto/companies.dto";
import { GoldIcon } from "./icons";

export const Navbar = ({
  companies,
  selectedCompany,
  setSelectedCompany,
}: {
  companies: Company[];
  selectedCompany?: Company;
  setSelectedCompany: (company: Company) => void;
}) => {
  return (
    <Box
      sx={{
        background: "#17192D",
        height: "48px",
        padding: "0 16px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <HeaderLogo />
      <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        {!!companies?.length &&
          companies?.map((item) => (
            <Box
              key={item.id}
              sx={{
                fontWeight: 600,
                fontSize: "12px",
                color: "white",
                background:
                  item.id === selectedCompany?.id ? "#2188FF" : "#023B78",
                cursor: "pointer",
                padding: "4px 8px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "4px",
              }}
              onClick={() => setSelectedCompany(item)}
            >
              <GoldIcon /> {item.name} Unit
            </Box>
          ))}
      </Box>
    </Box>
  );
};
