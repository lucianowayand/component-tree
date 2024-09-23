import { useCallback, useEffect, useState } from "react";
import { useFetchAssets } from "./useFetchAssets";
import { useFetchLocations } from "./useFetchLocations";
import { Asset } from "../../../dto/assets.dto";
import { Location } from "../../../dto/locations.dto";

export type TreeNode = {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
  parentId?: string;
  children?: TreeNode[];
  object: Asset | Location;
};

export const useBuildAssetTree = ({ companyId }: { companyId?: string }) => {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [filteredTree, setFilteredTree] = useState<TreeNode[]>([]);
  const [nameFilter, setNameFilter] = useState("");

  const { locations, loading: locationsLoading } = useFetchLocations({
    companyId,
  });

  const { assets, loading: assetsLoading } = useFetchAssets({ companyId });

  const buildTree = useCallback((): TreeNode[] => {
    const locationMap: { [key: string]: TreeNode } = {};
    const assetMap: { [key: string]: TreeNode } = {};

    locations.forEach((location) => {
      locationMap[location.id] = {
        id: location.id,
        name: location.name,
        type: "location",
        children: [],
        object: location,
      };
    });

    assets.forEach((asset) => {
      const assetNode: TreeNode = {
        id: asset.id,
        name: asset.name,
        type: asset.sensorType ? "component" : "asset",
        children: [],
        object: asset,
      };
      if (asset.parentId) {
        if (!assetMap[asset.parentId]) {
          assetMap[asset.parentId] = {
            id: asset.parentId,
            name: "",
            type: "asset",
            children: [],
            object: asset,
          };
        }
        assetMap[asset.parentId].children?.push(assetNode);
      }
      assetMap[asset.id] = assetNode;
    });

    assets.forEach((asset) => {
      if (asset.locationId) {
        const locationNode = locationMap[asset.locationId];
        if (locationNode) {
          locationNode.children?.push(assetMap[asset.id]);
        }
      }
    });

    locations.forEach((location) => {
      if (location.parentId) {
        const parentLocation = locationMap[location.parentId];
        if (parentLocation) {
          parentLocation.children?.push(locationMap[location.id]);
        }
      }
    });

    return Object.values(locationMap).filter((location) => !location.parentId);
  }, [locations, assets]);

  const filterTree = useCallback(
    (nodes: TreeNode[], query: string): TreeNode[] => {
      const lowercasedQuery = query.toLowerCase();

      return nodes
        .map((node) => {
          if (node.name.toLowerCase().includes(lowercasedQuery)) {
            return { ...node };
          }

          if (node.children) {
            const filteredChildren = filterTree(node.children, query);
            if (filteredChildren.length > 0) {
              return { ...node, children: filteredChildren };
            }
          }

          return null;
        })
        .filter((node) => node !== null) as TreeNode[];
    },
    []
  );

  useEffect(() => {
    const tree = buildTree();
    setTree(tree);
    setFilteredTree(filterTree(tree, nameFilter));
  }, [buildTree, filterTree, nameFilter]);

  useEffect(() => {
    setFilteredTree(filterTree(tree, nameFilter));
  }, [filterTree, nameFilter, tree]);

  return {
    tree: filteredTree,
    locations,
    assets,
    loading: locationsLoading || assetsLoading,
    nameFilter,
    setNameFilter,
  };
};
