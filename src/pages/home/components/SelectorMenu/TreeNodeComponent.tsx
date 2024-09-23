import { Box } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { TreeNode } from "../../hooks/useBuildAssetTree";
import { CollapsableArrowIcon, CollapsedArrowIcon } from "../icons";
import { NodeIcon } from "./NodeIcon";
import { StatusIndicator } from "./StatusIndicator";

export const TreeNodeComponent = ({
  node,
  selectedNode,
  setSelectedNode,
}: {
  node: TreeNode;
  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode) => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    if (node?.children?.length === 0) {
      setSelectedNode(node);
    }
  };

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
      <NodeIcon node={node} selectedNode={selectedNode} />
      {node.name} <StatusIndicator node={node} />
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
            <TreeNodeComponent
              key={child.id}
              node={child}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
