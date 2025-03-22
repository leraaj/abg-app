import React, { useState } from "react";
import "./alpha.css";

import EAMCLogo from "../../../assets/images/Logo 1.png";
import DOHLogo from "../../../assets/images/Logo 2.png";

const Index = () => {
  const [referenceCode, setReferenceCode] = useState("");
  const [revNum, setRevNum] = useState("");
  const [dateEffective, setDateEffective] = useState("");

  return (
    <div className="print-container">
      <div className="header-container ">
        <div className="left px-1">
          <div className="d-flex justify-content-center align-items-center">
            <img src={DOHLogo} height="55" />
          </div>
          <div className="row">
            <span className="capitalized semi-bold">
              republic of the philippines
            </span>
            <span className="uppercased semi-bold">department of health</span>
            <span className="capitalized semi-bold">
              east avenue medical center
            </span>
            <br />
            <span className="uppercased bold">pulmonary section</span>
            <span className="uppercased underlined bold">
              arterial blood gases official result
            </span>
          </div>
          <div className="d-flex justify-content-center align-items-center">
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
      <div className="row px-3">
        {/* First Column */}
        <div className="col-12 d-flex mt-1">
          <div className="col-5 ">
            <div className="col form-container">
              <div className="form-label uppercased">Name:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-3 ">
            <div className="col form-container">
              <div className="form-label uppercased">Age/Gender:</div>
              <input type="text" className="form-input" />
              <span>/</span>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label uppercased">Ward:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label uppercased">Date:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
        </div>
        {/* Second Column */}
        <div className="col-12 d-flex mt-1">
          <div className="col-5 ">
            <div className="col form-container">
              <div className="form-label uppercased">Diagnosis:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-5 ">
            <div className="col form-container">
              <div className="form-label uppercased">Physician:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label uppercased">Time:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
        </div>
        {/* Third COlumn */}
        <div className="col-12 d-flex mt-3 pl-5">
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label uppercased">Temp:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label uppercased">hgb:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label uppercased">FIO2:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
        </div>
        <div
          className="col-12 d-flex mt-1"
          style={{ paddingInlineStart: "70px" }}>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label normal">pH:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label normal">pCO2:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label normal">pO2:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2">
            <div className="col form-container">
              <div className="form-label normal">HCO3:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
        </div>
        <div
          className="col-12 d-flex mt-1"
          style={{ paddingInlineStart: "70px" }}>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label normal">ABE:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label normal">SaO2:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2 ">
            <div className="col form-container">
              <div className="form-label normal">ctCO2:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col-2">
            <div className="col-12"></div>
          </div>
        </div>
        {/* Checkboxes */}
        <div className="col-12 mt-5">
          <table className="col-12">
            <tr>
              {/* Adequate Oxygenation / hypoxemia */}
              <td></td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="adequateOxygenation"
                    class="form-label uppercased">
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
                  <label htmlFor="hypoxemia" class="form-label uppercased">
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
                  <label htmlFor="mild" class="form-label uppercased">
                    mild
                  </label>
                  <input type="checkbox" id="mild" class="form-checkbox" />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label htmlFor="moderate" class="form-label uppercased">
                    moderate
                  </label>
                  <input type="checkbox" id="moderate" class="form-checkbox" />
                </div>
              </td>
              <td colSpan={2}>
                <div class="form-container">
                  <label htmlFor="severe" class="form-label uppercased">
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
                    class="form-label col-auto uppercased">
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
                    class="form-label col-auto uppercased">
                    Acidosis
                  </label>
                  <input type="checkbox" id="acidosis" class="form-checkbox" />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="uncompensated"
                    class="form-label col-auto uppercased">
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
                    class="form-label col-auto uppercased">
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
                    class="form-label col-auto uppercased">
                    metabolic
                  </label>
                  <input type="checkbox" id="metabolic" class="form-checkbox" />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label for="alkalosis" class="form-label col-auto uppercased">
                    alkalosis
                  </label>
                  <input type="checkbox" id="alkalosis" class="form-checkbox" />
                </div>
              </td>
              <td>
                <div class="form-container">
                  <label
                    htmlFor="partiallyCompensated"
                    class="form-label col-auto uppercased">
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
                    class="form-label col-auto uppercased">
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
                    class="form-label col-auto uppercased">
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
                    class="form-label col-auto uppercased">
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
                      className="form-label semi-bold uppercased ">
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
            <div className="col  form-container-row">
              <label className="form-label semi-bold">Prepared By:</label>
              <input type="text" name="" className="form-input  " />
              <label className="form-label semi-bold uppercased text-align-center col-12">
                Respiratory therapist on duty
              </label>
            </div>
            <div className="col form-container-row">
              <label className="form-label semi-bold">Interpreted By:</label>
              <input type="text" name="" className="form-input  " />
              <label className="form-label semi-bold uppercased text-align-center col-12">
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
