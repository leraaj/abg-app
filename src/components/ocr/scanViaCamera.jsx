import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import Tesseract from "tesseract.js";

const Index = ({ onSendData }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null); // Image as null initially
  const [ocrResult, setOcrResult] = useState(""); // OCR result as a string
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraMode, setCameraMode] = useState("environment");

  const startCamera = async (mode) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode, // Switch between rear and front
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  useEffect(() => {
    startCamera(cameraMode);

    // Cleanup: Stop the camera when the component unmounts
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraMode]); // Restart camera when mode changes

  const toggleCamera = () => {
    setCameraMode((prevMode) =>
      prevMode === "environment" ? "user" : "environment"
    );
  };

  // Capture photo
  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL("image/png")); // Save the image as a base64 string
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
      const extractedText = result.data.text.split("\n"); // Get the extracted text
      onSendData(extractedText); // Pass the result to the parent component
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} md={6}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            height: "100%", // Adjust the video to match the aspect ratio
          }}
        ></video>
      </Grid>
      <Grid item sx={6} md={6}>
        <canvas
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        ></canvas>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box>
          <ButtonGroup
            variant="contained"
            aria-label="Basic button group"
            fullWidth
            size="large"
          >
            <Button onClick={toggleCamera}>
              Switch to {cameraMode === "environment" ? "Front" : "Rear"} Camera
            </Button>

            <Button onClick={handleCapture}>Capture Photo</Button>

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
        </Box>
      </Grid>
    </Grid>
  );
};

export default Index;
