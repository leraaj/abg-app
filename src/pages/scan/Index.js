import { useEffect, useState } from "react";
import ScanViaUpload from "../../components/ocr/scanViaUpload";
import ScanViaCamera from "../../components/ocr/scanViaCamera";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { CameraAlt, Image } from "@mui/icons-material";

const Index = () => {
  const [extractedText, setExtractedText] = useState([]);
  const [machine, setMachine] = useState("");
  const [scanOption, setScanOption] = useState("Image");

  const handleMachineType = (event: SelectChangeEvent) => {
    setMachine(event.target.value); // Set machine state to the selected value
  };
  const handleExtractedText = (text) => {
    setExtractedText(text); // Store the extracted text in parent state
    console.log(text);
  };
  const handleTextChange = (index, value) => {
    const updatedText = [...extractedText];
    updatedText[index] = value;
    setExtractedText(updatedText);
  };

  useEffect(() => {}, [extractedText]);

  return (
    <>
      {/* <ScanViaUpload onSendData={handleExtractedText} /> */}

      <Grid container justifyContent="center">
        <Grid item xs={8} md={8}>
          <Typography variant="h3" textAlign="center">
            Document Scanner
          </Typography>
          <Box>
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
          </Box>
        </Grid>
        <Grid item xs={8} md={8}>
          {scanOption == "Camera" ? (
            <ScanViaCamera onSendData={handleExtractedText} />
          ) : (
            <ScanViaUpload onSendData={handleExtractedText} />
          )}
        </Grid>
        <Grid item xs={8} md={8}>
          <Box paddingTop={5}>
            <div>
              <FormControl fullWidth>
                <InputLabel id="machine-type-label">Machine Type</InputLabel>
                <Select
                  labelId="machine-type-label"
                  value={machine}
                  onChange={handleMachineType}
                  label="Machine Type"
                >
                  <MenuItem value="Machine 1">Machine 1</MenuItem>
                  <MenuItem value="Machine 2">Machine 2</MenuItem>
                  <MenuItem value="Machine 3">Machine 3</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              {extractedText
                .filter((x) => x.includes("pH"))
                .map((field, index) => {
                  return (
                    <TextField
                      value={field}
                      onChange={(field) =>
                        handleTextChange(index, field.target.value)
                      }
                    />
                  );
                })}
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
