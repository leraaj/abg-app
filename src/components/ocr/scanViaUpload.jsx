import { useState } from "react";

const Index = ({ onSendData }) => {
  const [data, setData] = useState("");

  const handleExtractedText = (event) => {
    setData(event.target.value);
  };
  const handleSubmit = () => {
    onSendData(data);
  };

  return (
    <>
      <div>
        <input type="text" value={data} onChange={handleExtractedText} />
        <button onClick={handleSubmit}>Send Data to Parent</button>
      </div>
    </>
  );
};

export default Index;
