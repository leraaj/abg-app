import React, { useState } from "react";
import "./alpha.css";

import EAMCLogo from "../../../assets/images/Logo 1.png";
import DOHLogo from "../../../assets/images/Logo 2.png";

const Index = () => {
  const [referenceCode, setReferenceCode] = useState("");
  const [revNum, setRevNum] = useState("");
  const [dateEffective, setDateEffective] = useState("");

  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ward, setWard] = useState("");
  const [date, setDate] = useState("");

  const [diagsnosis, setDiagnosis] = useState("");
  const [physician, setPhysician] = useState("");
  const [time, setTime] = useState("");

  const [temp, setTemp] = useState("");
  const [hgb, setHgb] = useState("");
  const [fio2, setFio2] = useState("");
  const [ph, setPh] = useState("");
  const [pco2, setPco2] = useState("");
  const [po2, setPo2] = useState("");
  const [hco3, setHco3] = useState("");
  const [abe, setAbe] = useState("");
  const [sao2, setSao2] = useState("");
  const [ctco2, setCtco2] = useState("");

  const [rtOnDuty, setRtOnDuty] = useState("");
  const [pulmonaryConsultant, setPulmonaryConsultant] = useState("");

  return (
    <div className="print-container">
      <div className="header-container ">
        <div className="left">
          <div className="d-flex justify-content-end col-lg">
            <img src={DOHLogo} height="55" />
          </div>
          <div className="d-flex justify-content-end row col-lg">
            <span className="capitalized semi-bold text-nowrap">
              republic of the philippines
            </span>
            <span className="uppercased semi-bold text-nowrap">
              department of health
            </span>
            <span className="capitalized semi-bold text-nowrap">
              east avenue medical center
            </span>
            <br />
            <span className="uppercased bold text-nowrap">
              pulmonary section
            </span>
            <span className="uppercased underlined bold text-nowrap">
              arterial blood gases official result
            </span>
          </div>
          <div className="d-flex justify-content-start col-lg">
            <img src={EAMCLogo} height="55" />
          </div>
        </div>
        <div className="right">
          <div className="ref-container">
            <span className="f4">Reference code</span>
            <span className="f4">{referenceCode || "N/A"}</span>
            <span className="f4">Rev. No.:</span>
            <span className="f4">{revNum || "N/A"}</span>
            <span className="f4">Date Effective</span>
            <span className="f4">{dateEffective || "N/A"}</span>
          </div>
        </div>
      </div>
      <br />
      <div className="row px-3 col-lg-12">
        {/* First Column */}
        <div className="col-lg-12 d-flex mt-1">
          <div className="col-lg-5 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">Name:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={fullname || "N/A"}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">
                Age/Gender:
              </div>
              <input
                type="text"
                className="form-input text-center"
                defaultValue={age || "N/A"}
                onChange={(e) => setAge(e.target.value)}
              />
              <span>/</span>
              <input
                type="text"
                className="form-input text-center"
                defaultValue={"N/A"}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">Ward:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={ward || "N/A"}
                onChange={(e) => setWard(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">Date:</div>
              <input
                type="text"
                className="form-input text-center"
                defaultValue={date || "N/A"}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Second Column */}
        <div className="col-lg-12 d-flex mt-1">
          <div className="col-lg-5 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">
                Diagnosis:
              </div>
              <input
                type="text"
                className="form-input"
                defaultValue={diagsnosis || "N/A"}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-5 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">
                Physician:
              </div>
              <input
                type="text"
                className="form-input"
                defaultValue={physician || "N/A"}
                onChange={(e) => setPhysician(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">Time:</div>
              <input
                type="text"
                className="form-input text-center"
                defaultValue={time || "N/A"}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Third COlumn */}
        <div className="col-lg-12 d-flex mt-3 pl-5">
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">Temp:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={temp || "N/A"}
                onChange={(e) => setTemp(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">hgb:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={hgb || "N/A"}
                onChange={(e) => setHgb(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap uppercased">FIO2:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={fio2 || "N/A"}
                onChange={(e) => setFio2(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="col-lg-12 d-flex mt-1"
          style={{ paddingInlineStart: "70px" }}>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap normal">pH:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={ph || "N/A"}
                onChange={(e) => setPh(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap normal">pCO2:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={pco2 || "N/A"}
                onChange={(e) => setPco2(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap normal">pO2:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={po2 || "N/A"}
                onChange={(e) => setPo2(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap normal">HCO3:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={hco3 || "N/A"}
                onChange={(e) => setHco3(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="col-lg-12 d-flex mt-1"
          style={{ paddingInlineStart: "70px" }}>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap normal">ABE:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={abe || "N/A"}
                onChange={(e) => setAbe(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap normal">SaO2:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={sao2 || "N/A"}
                onChange={(e) => setSao2(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 ">
            <div className="col-lg form-container">
              <div className="form-label text-nowrap normal">ctCO2:</div>
              <input
                type="text"
                className="form-input"
                defaultValue={ctco2 || "N/A"}
                onChange={(e) => setCtco2(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="col-lg-12"></div>
          </div>
        </div>
        {/* Checkboxes */}
        <div className="col-lg-12 mt-5">
          <table className="col-lg-12">
            <tr>
              {/* Adequate Oxygenation / hypoxemia */}
              <td></td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="adequateOxygenation"
                    class="form-label text-nowrap uppercased">
                    adequate oxygenation
                  </label>
                  <input
                    type="checkbox"
                    id="adequateOxygenation"
                    class="form-checkbox"
                  />
                </div>
              </td>
              <td colSpan={2}>
                <div class="form-container">
                  <label
                    htmlFor="hypoxemia"
                    class="form-label text-nowrap uppercased">
                    hypoxemia
                  </label>
                  <input type="checkbox" id="hypoxemia" class="form-checkbox" />
                </div>
              </td>
            </tr>
            <tr>
              {/* Mild, Moderate, Severe */}
              <td>
                <div class="form-container">
                  <label
                    htmlFor="mild"
                    class="form-label text-nowrap uppercased">
                    mild
                  </label>
                  <input type="checkbox" id="mild" class="form-checkbox" />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="moderate"
                    class="form-label text-nowrap uppercased">
                    moderate
                  </label>
                  <input type="checkbox" id="moderate" class="form-checkbox" />
                </div>
              </td>
              <td colSpan={2}>
                <div class="form-container">
                  <label
                    htmlFor="severe"
                    class="form-label text-nowrap uppercased">
                    severe
                  </label>
                  <input type="checkbox" id="severe" class="form-checkbox" />
                </div>
              </td>
            </tr>
            <tr>
              {/* Respiratory, Acidosis, Uncompensated, Mild */}
              <td>
                <div class="form-container">
                  <label
                    htmlFor="respiratory"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    Respiratory
                  </label>
                  <input
                    type="checkbox"
                    id="respiratory"
                    class="form-checkbox"
                  />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="acidosis"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    Acidosis
                  </label>
                  <input type="checkbox" id="acidosis" class="form-checkbox" />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="uncompensated"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    Uncompensated
                  </label>
                  <input
                    type="checkbox"
                    id="uncompensated"
                    class="form-checkbox"
                  />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="mild-2"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    mild
                  </label>
                  <input type="checkbox" id="mild-2" class="form-checkbox" />
                </div>
              </td>
            </tr>
            <tr>
              {/* metabolic, alkalosis, partially compensated, moderate */}
              <td>
                <div class="form-container">
                  <label
                    htmlFor="metabolic"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    metabolic
                  </label>
                  <input type="checkbox" id="metabolic" class="form-checkbox" />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    for="alkalosis"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    alkalosis
                  </label>
                  <input type="checkbox" id="alkalosis" class="form-checkbox" />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="partiallyCompensated"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    partially compensated
                  </label>
                  <input
                    type="checkbox"
                    id="partiallyCompensated"
                    class="form-checkbox"
                  />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    for="moderate-2"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    moderate
                  </label>
                  <input
                    type="checkbox"
                    id="moderate-2"
                    class="form-checkbox"
                  />
                </div>
              </td>
            </tr>
            <tr>
              {/* blank, blank , fully compensated, severe */}
              <td colSpan={2}></td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="fullyCompensated"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    fully compensated
                  </label>
                  <input
                    type="checkbox"
                    id="fullyCompensated"
                    class="form-checkbox"
                  />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="severe-2"
                    class="form-label text-nowrap col-lg-auto uppercased">
                    severe
                  </label>
                  <input type="checkbox" id="severe-2" class="form-checkbox" />
                </div>
              </td>
            </tr>
            <tr>
              <td />
              <td colSpan={2}>
                <div className="d-flex px-1">
                  <div className="d-flex align-start" style={{ gap: "0.3rem" }}>
                    <input
                      type="checkbox"
                      id="mixed"
                      className="form-input"
                      style={{ marginBlockStart: "0.35rem" }}
                    />
                    <span
                      htmlFor="mixed"
                      className="form-label text-nowrap semi-bold uppercased ">
                      mixed
                    </span>
                  </div>
                  <textarea type="text" id="mixed" className="form-input" />
                </div>
              </td>
              <td />
            </tr>
          </table>
        </div>
        {/* Footer */}
        <div className="d-flex justify-content-center gap-1">
          <div
            className="d-flex gap-2"
            style={{ width: "70%", marginBlock: "80px 10px" }}>
            <div className="col-lg  form-container-row">
              <label className="form-label text-nowrap semi-bold">
                Prepared By:
              </label>
              <input
                type="text"
                name=""
                className="form-input text-center"
                defaultValue={rtOnDuty || "N/A"}
                onChange={(e) => setRtOnDuty(e.target.value)}
              />
              <label className="text-nowrap form-label semi-bold uppercased text-align-center col-lg-12">
                Respiratory therapist on duty
              </label>
            </div>
            <div className="col-lg form-container-row">
              <label className="form-label semi-bold">Interpreted By:</label>
              <input
                type="text"
                name=""
                className="form-input text-center"
                defaultValue={pulmonaryConsultant || "N/A"}
                onChange={(e) => setPulmonaryConsultant(e.target.value)}
              />
              <label className="text-nowrap form-label semi-bold uppercased text-align-center col-lg-12">
                Pulmo Consultant/pulmo result
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
