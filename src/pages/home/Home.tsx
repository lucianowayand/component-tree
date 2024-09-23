import { Box, Grid, Typography } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { useFetchCompanies } from "./hooks/useFetchCompanies";
import { TreeNode, useBuildAssetTree } from "./hooks/useBuildAssetTree";
import { Header } from "./components/Header";
import { SelectorMenu } from "./components/SelectorMenu/SelectorMenu";
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
          <Header companyName={selectedCompany?.name || "-"} selectedNode={selectedNode} />
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
              {selectedNode && (
                <Box>
                  <Box
                    sx={{
                      height: "18px",
                      padding: "12px 16px",
                      borderBottom: "1px solid #D8DFE6",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography fontWeight={600} color="#24292F">
                      {selectedNode?.name}
                    </Typography>
                  </Box>
                  <Grid container>
                    {Object.entries(selectedNode?.object).map(
                      ([key, value]) => (
                        <Grid item xs={6} key={key}>
                          <Box
                            sx={{
                              padding: "12px 16px",
                              borderBottom: "1px solid #D8DFE6",
                            }}
                          >
                            <Typography color="gray">{key}</Typography>
                            <Typography>{value || "-"}</Typography>
                          </Box>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
