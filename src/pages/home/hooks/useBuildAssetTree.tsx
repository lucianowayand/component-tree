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
    const addedChildNodes = new Set<string>(); // Track nodes added as children
  
    // Step 1: Populate locationMap with locations
    locations.forEach((location) => {
      locationMap[location.id] = {
        id: location.id,
        name: location.name,
        type: "location",
        children: [],
        object: location,
      };
    });
  
    // Step 2: Populate assetMap with assets
    assets.forEach((asset) => {
      assetMap[asset.id] = {
        id: asset.id,
        name: asset.name,
        type: asset.sensorType ? "component" : "asset",
        children: [],
        object: asset,
      };
    });
  
    // Step 3: Link assets to their parent asset or location
    assets.forEach((asset) => {
      const assetNode = assetMap[asset.id];
      
      // If asset has a parent asset, link it to the parent asset
      if (asset.parentId && assetMap[asset.parentId]) {
        const parentAssetNode = assetMap[asset.parentId];
        parentAssetNode.children = parentAssetNode.children || [];
        parentAssetNode.children.push(assetNode);
        addedChildNodes.add(asset.id); // Mark as added to avoid duplicating
      } 
      // Otherwise, link the asset to a location if it has a locationId
      else if (asset.locationId && locationMap[asset.locationId]) {
        const locationNode = locationMap[asset.locationId];
        locationNode.children = locationNode.children || [];
        locationNode.children.push(assetNode);
        addedChildNodes.add(asset.id); // Mark as added to avoid duplicating
      }
    });
  
    // Step 4: Link locations to their parent locations (if they have one)
    locations.forEach((location) => {
      if (location.parentId && locationMap[location.parentId]) {
        const parentLocation = locationMap[location.parentId];
        parentLocation.children = parentLocation.children || [];
        parentLocation.children.push(locationMap[location.id]);
        addedChildNodes.add(location.id); // Mark as added to avoid duplicating
      }
    });
  
    // Step 5: Return only root locations (locations without parentId and not added as a child)
    return Object.values(locationMap).filter(
      (location) => !location.parentId && !addedChildNodes.has(location.id)
    );
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
