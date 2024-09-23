import { Box, InputBase } from "@mui/material";
import { TreeNode } from "../../hooks/useBuildAssetTree";
import { SearchIcon } from "../icons";
import { TreeNodeComponent } from "./TreeNodeComponent";

export const SelectorMenu = ({
  tree,
  nameFilter,
  setNameFilter,
  selectedNode,
  setSelectedNode,
}: {
  tree: TreeNode[];
  nameFilter: string;
  setNameFilter: (name: string) => void;
  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode) => void;
}) => {
  return (
    <Box
      sx={{
        width: "35%",
        border: "1px solid #D8DFE6",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <InputBase
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        fullWidth
        endAdornment={<SearchIcon />}
        sx={{ borderBottom: "1px solid #D8DFE6", padding: "4px 12px" }}
        placeholder="Buscar Ativo ou Local"
      />
      <Box
        sx={{
          height: "80vh",
          overflowY: "auto",
          marginRight: "6px",
          "::-webkit-scrollbar": {
            width: "6px",
            borderRadius: "4px",
          },
          "::-webkit-scrollbar-track": {
            background: "#D8DFE6",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.2)",
            borderRadius: "4px",
          },
        }}
      >
        {tree.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        ))}
      </Box>
    </Box>
  );
};
