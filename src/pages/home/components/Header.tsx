import { Box, Typography } from "@mui/material";

export const Header = ({ companyName }: { companyName: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography fontWeight={600} fontSize={20} color="#24292F">
        Ativos{" "}
        <span style={{ fontWeight: 400, fontSize: 14, color: "#77818C" }}>
          / {companyName} Unit
        </span>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
        }}
      >
        <Box>Sensor de Energia</Box>
        <Box>Critico</Box>
      </Box>
    </Box>
  );
};
