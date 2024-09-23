import { Box } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { useFetchCompanies } from "./hooks/useFetchCompanies";
import { TreeNode, useBuildAssetTree } from "./hooks/useBuildAssetTree";
import { Header } from "./components/Header";
import { SelectorMenu } from "./components/SelectorMenu";
import { useEffect, useState } from "react";
export const Home = () => {
  const { companies, selectedCompany, setSelectedCompany } =
    useFetchCompanies();

  const { tree, nameFilter, setNameFilter } = useBuildAssetTree({
    companyId: selectedCompany?.id,
  });

  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  useEffect(() => {
    setNameFilter("");
  }, [selectedCompany, setNameFilter]);

  useEffect(() => {
    console.log(selectedNode);
  }, [selectedNode]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Navbar
        companies={companies}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
      <Box sx={{ background: "white", flexGrow: 1, padding: "8px" }}>
        <Box
          sx={{
            background: "white",
            border: "1px solid #D8DFE6",
            borderRadius: "4px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Header companyName={selectedCompany?.name || "-"} />
          <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <SelectorMenu
              tree={tree}
              nameFilter={nameFilter}
              setNameFilter={setNameFilter}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
            />
            <Box
              sx={{
                width: "65%",
                border: "1px solid #D8DFE6",
                borderRadius: "2px",
              }}
            >
              {!selectedNode && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "gray",
                  }}
                >
                  Selecione um ativo
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
