import { Box } from "@mui/material";
import { TreeNode } from "../../hooks/useBuildAssetTree";
import { BoltIcon } from "../icons";

export const StatusIndicator = ({ node }: { node: TreeNode }) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  if ("status" in node?.object) {
    if (node?.object?.status === "alert") {
      return (
        <Box
          sx={{
            background: "red",
            borderRadius: "50%",
            width: "8px",
            height: "8px",
          }}
        />
      );
    } else if (node?.object?.status === "operating") {
      if (node?.object?.sensorType === "energy") {
        return <BoltIcon />;
      } else {
        return (
          <Box
            sx={{
              background: "green",
              borderRadius: "50%",
              width: "8px",
              height: "8px",
            }}
          />
        );
      }
    }
  }
};
