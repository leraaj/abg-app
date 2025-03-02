import { CameraAlt, Image } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ScanViaCamera from "../../components/ocr/scanViaCamera";
import ScanViaUpload from "../../components/ocr/scanViaUpload";

// Constants for machine types
const MACHINE_TYPES = ["Edan", "Gem 3500", "Gem 5000"];
// Constants for filter keys
const FILTER_KEYS = [
  "Model:",
  "First Name",
  "Last Name",
  "pH",
  "pCO",
  "PO",
  "HCO",
  "BE",
  "TCO",
  "FLO",
];

const Index = () => {
  const [extractedText, setExtractedText] = useState([]);
  const [modifyText, setModifyText] = useState({
    model: "",
    firstName: "",
    lastName: "",
    pH: "",
    pCO: "",
    PO: "",
    HCO: "",
    BE: "",
    TCO: "",
    FLO: "",
  });
  const [machine, setMachine] = useState("");
  const [scanOption, setScanOption] = useState("Image");

  const handleMachineType = useCallback((event) => {
    setMachine(event.target.value);
  }, []);

  const handleExtractedText = useCallback((text) => {
    setExtractedText(text);
    console.log(text);
  }, []);

  const handleTextChange = useCallback(
    (index, value) => {
      const updatedText = [...extractedText];
      updatedText[index] = value;
      setExtractedText(updatedText);
    },
    [extractedText]
  );

  useEffect(() => {}, [extractedText]);

  const filteredText = extractedText.filter((text) =>
    FILTER_KEYS.some((key) => text.includes(key) || text.startsWith(key))
  );

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={4} md={4}>
        {scanOption === "Camera" ? (
          <ScanViaCamera onSendData={handleExtractedText} />
        ) : (
          <ScanViaUpload onSendData={handleExtractedText} />
        )}
      </Grid>

      <Grid item xs={4} md={4}>
        <Box paddingTop={5} display="flex" flexDirection="column" gap={2}>
          <ButtonGroup>
            <Button
              startIcon={<CameraAlt />}
              onClick={() => setScanOption("Camera")}
            >
              Camera
            </Button>
            <Button
              startIcon={<Image />}
              onClick={() => setScanOption("Image")}
            >
              Image
            </Button>
          </ButtonGroup>

          <FormControl fullWidth sx={{ marginBottom: "1em" }}>
            <InputLabel id="machine-type-label">Machine Type</InputLabel>
            <Select
              labelId="machine-type-label"
              value={machine}
              onChange={handleMachineType}
              label="Machine Type"
            >
              {MACHINE_TYPES.map((machineType) => (
                <MenuItem key={machineType} value={machineType}>
                  {machineType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            {filteredText.map((field, index) => (
              <TextField
                key={index}
                value={field}
                onChange={(e) => handleTextChange(index, e.target.value)}
                fullWidth
                sx={{ marginBottom: "1em" }}
              />
            ))}
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Index;
