import { TreeNode } from "../../hooks/useBuildAssetTree";
import { LocationIcon, AssetIcon, ComponentIcon } from "../icons";

export const NodeIcon = ({
  node,
  selectedNode,
}: {
  node: TreeNode;
  selectedNode: TreeNode | null;
}) => {
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
      <AssetIcon color={selectedNode?.id === node.id ? "white" : undefined} />
    );
  } else {
    return (
      <ComponentIcon
        color={selectedNode?.id === node.id ? "white" : undefined}
      />
    );
  }
};
