import { useEffect, FC, CSSProperties } from "react";
import dohLogo from "../assets/images/brand/dohLogo.png";
import eastAveLogo from "../assets/images/brand/eastAveLogo.png";

interface DefaultValues {
  [key: string]: string | undefined;
  prepared_by?: string;
  interpreted_by?: string;
}

interface ResultFormProps {
  defaultValues?: DefaultValues;
}

interface Field {
  gridName: string;
  label: string;
  box?: boolean;
}

interface FooterField {
  label: string;
  value?: string;
  subLabel: string;
}

const ResultForm: FC<ResultFormProps> = ({ defaultValues }) => {
  const formStyle: CSSProperties = {
    padding: "20px",
    width: "100%",
    minWidth: "800px",
    overflow: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "auto",
    gridTemplateAreas: `
      "header header header header meta"
      "content content content content content"
      "footer footer footer footer footer"
    `,
    gap: "10px",
    fontSize: "9px",
    border: "solid",
  };

  const headerStyle: CSSProperties = {
    gridArea: "header",
    padding: "10px",
    textAlign: "center",
  };

  const metaStyle: CSSProperties = {
    gridArea: "meta",
  };

  const contentStyle: CSSProperties = {
    gridArea: "content",
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "auto",
    gridTemplateAreas: `
      "name name ageGender ward date"
      "diagnosis diagnosis physician physician time"
      "temp hgb  fio2 . ."
      "pH pco2 po2 hco3 ."
      "be sao2 ctco2 . ."
      "oxygeneation oxygeneation hypoxema  . ."
      "mild moderate severe . ."
      "respiratory acidosis uncompensated mild2 ."
      "metabolic alkalosis partially-compensated moderate2 ."
      ". . fully-compensated severe2 ."
      ".  mixed mixed mixed ."
    `,
  };

  const fields: Field[] = [
    { gridName: "name", label: "NAME:" },
    { gridName: "ageGender", label: "AGE/GENDER:" },
    { gridName: "ward", label: "WARD:" },
    { gridName: "date", label: "DATE:" },
    { gridName: "diagnosis", label: "DIAGNOSIS:" },
    { gridName: "physician", label: "PHYSICIAN:" },
    { gridName: "time", label: "TIME:" },
    { gridName: "temp", label: "TEMP:" },
    { gridName: "hgb", label: "HGB:" },
    { gridName: "fio2", label: "FIO2:" },
    { gridName: "pH", label: "pH:" },
    { gridName: "pco2", label: "pCO2:" },
    { gridName: "hco3", label: "HC03:" },
    { gridName: "be", label: "ABE:" },
    { gridName: "sao2", label: "Sa02:" },
    { gridName: "ctco2", label: "ctC02:" },
    { gridName: "po2", label: "PO2:" },
    { gridName: "oxygeneation", label: "ADEQUATE OXYGENATION:", box: true },
    { gridName: "hypoxema", label: "HYPOXEMA", box: true },
    { gridName: "mild", label: "MILD", box: true },
    { gridName: "moderate", label: "MODERATE", box: true },
    { gridName: "severe", label: "SEVERE", box: true },
    { gridName: "mild2", label: "MILD", box: true },
    { gridName: "moderate2", label: "MODERATE", box: true },
    { gridName: "severe2", label: "SEVERE", box: true },
    { gridName: "respiratory", label: "RESPIRATORY", box: true },
    { gridName: "acidosis", label: "ACIDOSIS", box: true },
    { gridName: "uncompensated", label: "UNCOMPENSATED", box: true },
    { gridName: "metabolic", label: "METABOLIC", box: true },
    { gridName: "alkalosis", label: "ALKALOSIS", box: true },
    { gridName: "mixed", label: "INTERPRETATION:" },
    {
      gridName: "partially-compensated",
      label: "PARTIALLY COMPENSATED",
      box: true,
    },
    { gridName: "fully-compensated", label: "FULLY COMPENSATED", box: true },
  ];

  const footetFields: FooterField[] = [
    {
      label: "PREPARED BY",
      value: defaultValues?.prepared_by,
      subLabel: "RESPIRATORY THERAPISTS ON DUTY",
    },
    {
      label: "INTERPRETED BY",
      value: defaultValues?.interpreted_by,
      subLabel: "PULMO CONSULTANT/PULMO RESIDENT",
    },
  ];

  const footerStyle: CSSProperties = {
    gridArea: "footer",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  };

  const fieldStyle: CSSProperties = {
    display: "flex",
    gap: "3px",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: "4px",
  };

  const imageStyle: CSSProperties = {
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    backgroundColor: "grey",
  };

  useEffect(() => {}, [defaultValues]);

  return (
    <div style={formStyle}>
      <div style={headerStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}>
          <div>
            <img src={dohLogo} style={imageStyle} />
          </div>
          <div>
            <strong>Republic of the Philippines</strong>
            <br />
            <strong>DEPARTMENT OF HEALTH</strong>
            <br />
            <strong>East Avenue Medical Center</strong>
            <br />
            <br />
            <strong>PULMONARY SECTION</strong>
            <br />
            <strong style={{ textDecoration: "underline" }}>
              ARTERIAL BLOOD GAS OFFICIAL RESULT
            </strong>
          </div>
          <div>
            <img src={eastAveLogo} style={imageStyle} />
          </div>
        </div>
      </div>

      <div style={metaStyle}>
        <ul style={{ margin: 0, padding: 0, textAlign: "center" }}>
          {[
            "Reference Code",
            "FM-MED-PUL-001",
            "Rev No:",
            "0",
            "Date Effective",
            "October 1, 2013",
          ].map((text, index) => (
            <li key={index} style={{ listStyle: "none", border: "1px solid" }}>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div style={contentStyle}>
        {fields.map((item, index) => (
          <div key={index} style={{ gridArea: item.gridName, ...fieldStyle }}>
            {item.box ? (
              <>
                <div
                  style={{
                    height: "15px",
                    width: "10px",
                    border: "1px solid",
                  }}></div>
                <label style={{ width: "100%" }}>{item.label}</label>
              </>
            ) : (
              <>
                {item.label === "INTERPRETATION:" && (
                  <div
                    style={{
                      height: "15px",
                      width: "10px",
                      border: "1px solid",
                    }}></div>
                )}
                <label>{item.label}</label>
                <label
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid black",
                    outline: "none",
                    height: "12px",
                  }}>
                  {defaultValues?.[item.gridName] || ""}
                </label>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={footerStyle}>
        {footetFields.map((item, index) => (
          <div key={index} style={{ width: "200px" }}>
            <label style={{ marginBottom: "1.5em" }}>{item.label}</label>
            <br />
            <label
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
                height: "12px",
              }}>
              {item.value || ""}
            </label>
            <label>{item.subLabel}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultForm;
