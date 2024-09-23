import { Box, Typography } from "@mui/material";
import { TreeNode } from "../hooks/useBuildAssetTree";
import { ThunderIcon, WarningIcon } from "./icons";

export const Header = ({
  companyName,
  selectedNode,
}: {
  companyName: string;
  selectedNode: TreeNode | null;
}) => {
  const isCritical =
    (selectedNode?.object &&
      // eslint-disable-next-line no-unsafe-optional-chaining
      "status" in selectedNode?.object &&
      selectedNode?.object?.status === "alert") ||
    false;

  const isEnergy =
    (selectedNode?.object &&
      // eslint-disable-next-line no-unsafe-optional-chaining
      "sensorType" in selectedNode?.object &&
      selectedNode?.object?.sensorType === "energy") ||
    false;

  const HeaderComponentMarker = ({
    toggled,
    children,
  }: {
    toggled: boolean;
    children: (JSX.Element | string)[];
  }) => {
    return (
      <Box
        sx={{
          background: toggled ? "#2188FF" : undefined,
          color: toggled ? "white" : "#24292F",
          fill: toggled ? "white" : "#24292F",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          border: "1px solid #D8DFE6",
          padding: "6px 16px",
          borderRadius: "3px",
        }}
      >
        {children}
      </Box>
    );
  };

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
        <HeaderComponentMarker toggled={isEnergy}>
          <ThunderIcon color={isEnergy ? "white" : undefined} /> Sensor de
          Energia
        </HeaderComponentMarker>
        <HeaderComponentMarker toggled={isCritical}>
          <WarningIcon color={isCritical ? "white" : undefined} /> Critico
        </HeaderComponentMarker>
      </Box>
    </Box>
  );
};
