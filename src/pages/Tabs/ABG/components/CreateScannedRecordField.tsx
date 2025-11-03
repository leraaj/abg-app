import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

type Field = {
  fieldName: string;
  targetText: string[];
  currentValue: number | "";
};

type CreateScannedRecordFieldProps = {
  data: string[]; // array of extracted strings
  onSubmit: (fields: Field[]) => void;
};

const CreateScannedRecordField: React.FC<CreateScannedRecordFieldProps> = ({
  data,
  onSubmit,
}) => {
  const [fields, setFields] = useState<Field[]>([
    { fieldName: "pH", targetText: ["ph"], currentValue: "" },
    {
      fieldName: "pCO2",
      targetText: ["pco2", "pc02", "pco", "pc0"],
      currentValue: "",
    },
    {
      fieldName: "PO2",
      targetText: ["po2", "p02", "pco", "pc0"],
      currentValue: "",
    },
    { fieldName: "HCO3", targetText: ["hco", "hc0"], currentValue: "" },
    { fieldName: "TCO2", targetText: ["tco", "tc0"], currentValue: "" },
    { fieldName: "BE", targetText: ["be", "be(b)"], currentValue: "" },
    { fieldName: "SO2", targetText: ["so", "s0"], currentValue: "" },
    // { fieldName: "FIO2", targetText: ["flo", "fl0"], currentValue: "" },
  ]);

  const handleFirstNumber = (value: string): number | "" => {
    const parts = value
      .split(" ")
      .filter((word) => !isNaN(Number(word)) && word.trim() !== "");
    return parts.length > 0 ? Number(parts[0]) : "";
  };

  const assignValuesToFields = () => {
    if (data && data.length > 0) {
      setFields((prevFields) =>
        prevFields.map((field) => {
          const match = field.targetText.find((target) =>
            data.some((extracted) =>
              extracted.toLowerCase().includes(target.toLowerCase())
            )
          );

          if (match && field.currentValue === "") {
            const matchedExtractedText = data.find((extracted) =>
              extracted.toLowerCase().includes(match.toLowerCase())
            );

            if (matchedExtractedText) {
              const filteredValue = handleFirstNumber(matchedExtractedText);
              return { ...field, currentValue: filteredValue };
            }
          }

          return field;
        })
      );
    }
  };

  useEffect(() => {
    assignValuesToFields();
  }, [data]);

  useEffect(() => {
    if (fields.length > 0) {
      onSubmit(fields);
    }
  }, [fields, onSubmit]);

  const handleFieldChange = (index: number, value: string) => {
    // Convert value to number if possible, else ""
    const newValue: number | "" = value === "" ? "" : Number(value);

    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, currentValue: newValue } : field
      )
    );
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <TextField
            fullWidth
            label={field.fieldName}
            variant="outlined"
            value={field.currentValue === "" ? "" : field.currentValue}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            type="number"
          />
        </div>
      ))}
    </div>
  );
};

export default CreateScannedRecordField;
