import { Box, Button, ButtonGroup } from "@mui/material";
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
        logger: (info) => "",
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
    <Box>
      <form style={{ display: "inline-block" }}>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </form>
      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        fullWidth
      >
        <Button
          type="button"
          onClick={() => document.getElementById("imageInput").click()}
        >
          Upload Image
        </Button>
        <Button
          onClick={handleOCR}
          style={{
            backgroundColor: isProcessing ? "#ccc" : "blue",
          }}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Scan Document"}
        </Button>
      </ButtonGroup>
      {
        <img
          src={image ? image : imagePlaceholder}
          alt="Uploaded"
          style={{ width: "100%", height: "100%" }}
        />
      }
    </Box>
  );
};

export default Index;
