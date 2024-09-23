import { Box, InputBase } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TreeNode } from "../hooks/useBuildAssetTree";
import {
  LocationIcon,
  AssetIcon,
  ComponentIcon,
  CollapsableArrowIcon,
  CollapsedArrowIcon,
  SearchIcon,
} from "./icons";

type TreeNodeProps = {
  node: TreeNode;
};

type TreeViewProps = {
  data: TreeNode[];
};

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
  const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const nodeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (nodeRef.current) {
        observer.observe(nodeRef.current);
      }

      return () => {
        if (nodeRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(nodeRef.current);
        }
      };
    }, [nodeRef]);

    const handleToggle = () => {
      setIsCollapsed(!isCollapsed);
      if (node?.children?.length === 0) {
        setSelectedNode(node);
      }
    };

    const NodeIcon = () => {
      if (node?.type === "location") {
        return (
          <LocationIcon
            color={selectedNode?.id === node.id ? "white" : undefined}
          />
        );
      } else if (
        node?.type === "asset" &&
        node?.children &&
        node?.children?.length > 0
      ) {
        return (
          <AssetIcon
            color={selectedNode?.id === node.id ? "white" : undefined}
          />
        );
      } else {
        return (
          <ComponentIcon
            color={selectedNode?.id === node.id ? "white" : undefined}
          />
        );
      }
    };

    const NodeLeaf = ({
      node,
      isCollapsed,
    }: {
      node: TreeNode;
      isCollapsed: boolean;
    }) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "4px 8px",
          gap: "12px",
          background: selectedNode?.id === node.id ? "#2188FF" : "white",
          color: selectedNode?.id === node.id ? "white" : "black",
        }}
      >
        {node?.children &&
          node?.children?.length > 0 &&
          (isCollapsed ? <CollapsableArrowIcon /> : <CollapsedArrowIcon />)}
        <NodeIcon />
        {node.name}
      </Box>
    );

    return (
      <div ref={nodeRef} style={{ marginLeft: "20px" }}>
        <span onClick={handleToggle} style={{ cursor: "pointer" }}>
          <NodeLeaf isCollapsed={isCollapsed} node={node} />
        </span>
        {!isCollapsed && isVisible && node.children && (
          <div>
            {node.children.map((child) => (
              <TreeNodeComponent key={child.id} node={child} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const TreeView: React.FC<TreeViewProps> = ({ data }) => {
    return (
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
        {data.map((node) => (
          <TreeNodeComponent key={node.id} node={node} />
        ))}
      </Box>
    );
  };

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
      />
      <TreeView data={tree} />
    </Box>
  );
};
