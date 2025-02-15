import { useState } from "react";
import scanViaUpload from "../../components/ocr/scanViaUpload";
const Index = () => {
  const [extractedText, setExtractedText] = useState([]);

  const handleGenerateData = (data) => {
    setExtractedText(data);
  };
  return (
    <>
      <scanViaUpload onSendData={handleGenerateData} />
    </>
  );
};

export default Index;
