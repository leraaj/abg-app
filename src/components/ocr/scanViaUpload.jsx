import {
  Box,
  Button,
  ButtonGroup,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Tesseract from "tesseract.js";

import imagePlaceholder from "../../assets/images/img-placeholder.jpg";
const Index = ({ onSendData }) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null); // Image as null initially
  const [ocrResult, setOcrResult] = useState(""); // OCR result as a string
  const [isProcessing, setIsProcessing] = useState(false);

  // Upload photo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Perform OCR using Tesseract.js
  const handleOCR = async () => {
    if (!image) {
      alert("Please capture or upload an image first!");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (info) => console.log(info),
      });
      const extractedText = result.data.text.split("\n");
      onSendData(extractedText);
    } catch (error) {
      console.error("OCR Error:", error);
      setOcrResult("Failed to extract text.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        backgroundColor="black">
        {
          <img
            src={image ? image : imagePlaceholder}
            alt="Uploaded"
            style={{ width: "100%", height: "100%" }}
          />
        }
        <form style={{ display: "inline-block" }}>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </form>
      </Grid>

      <Grid item xs={12}>
        <Box>
          <ButtonGroup
            variant="contained"
            aria-label="Basic button group"
            fullWidth
            size="large">
            <Button
              type="button"
              onClick={() => document.getElementById("imageInput").click()}>
              Upload Image
            </Button>
            <Button
              onClick={handleOCR}
              style={{
                backgroundColor: isProcessing ? "#ccc" : "blue",
              }}
              disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Scan Document"}
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Index;
