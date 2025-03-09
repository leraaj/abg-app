import React from "react";
import "./abg.css";
import EAMCLogo from "../../../assets/images/Logo 1.png";
import DOHLogo from "../../../assets/images/Logo 2.png";
const Index = () => {
  return (
    <div className="abg-container">
      <div className="header col-12 ">
        <div className="col header-title" style={{ paddingInline: "15%" }}>
          <div className="logo col-auto">
            <img src={DOHLogo} alt="DOH logo" className="logo-height" />
          </div>
          <div className="col header-center">
            <span className="capitalized semi-bold">
              Republic of the philippines
            </span>
            <span className="uppercased semi-bold">department of health</span>
            <span className="capitalized semi-bold">
              east avenue medical center
            </span>
            <br />
            <span className="uppercased bold mt-1">pulmonary section</span>
            <span className="text-nowrap uppercased bold underlined">
              arterial blood gases official result
            </span>
            <br />
          </div>
          <div className="logo col-auto">
            <img src={EAMCLogo} alt="EAMC logo" className="logo-height" />
          </div>
        </div>
        <div className="col-2 header-right">
          <div>Reference Code:</div>
          <div>{"N/A"}</div>
          <div>Rev. No:</div>
          <div>{"N/A"}</div>
          <div>Date Effective</div>
          <div>{"N/A"}</div>
        </div>
      </div>
      <div className="body">
        <div className="row gap-1">
          <div className="d-flex gap-1">
            <div className="col form-container">
              <div className="form-label">Name:</div>
              <input type="text" className="form-input" />
            </div>
            <div className="col form-container">
              <div className="form-label">Age/gender:</div>
              <input type="text" className="form-input" />
            </div>
            <div className="col form-container">
              <div className="form-label">ward:</div>
              <input type="text" className="form-input" />
            </div>

            <div className="col-2  form-container">
              <div className="form-label">date:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="d-flex gap-1">
            <div className="col form-container">
              <div className="form-label">diagnosis:</div>
              <input type="text" className="form-input" />
            </div>
            <div className="col  form-container">
              <div className="form-label">physician:</div>
              <input type="text" className="form-input" />
            </div>
            <div className="col-2 form-container">
              <div className="form-label">time:</div>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="col row px-5">
            <div className="col d-flex justify-start  mb-2">
              <div className="col-auto form-container">
                <div className="form-label uppercased">temp:</div>
                <input type="text" className="form-input" />
              </div>
              <div className="col-auto form-container">
                <div className="form-label uppercased">hgb:</div>
                <input type="text" className="form-input" />
              </div>
              <div className="col-auto form-container">
                <div className="form-label uppercased">fio2:</div>
                <input type="text" className="form-input" />
              </div>
            </div>
            <div className="col row px-5">
              <div className="d-flex justify-start gap-1">
                <div className="col-auto form-container">
                  <div className="form-label normal">pH:</div>
                  <input type="text" className="form-input" />
                </div>
                <div className="col-auto form-container">
                  <div className="form-label normal">pCO2:</div>
                  <input type="text" className="form-input" />
                </div>
                <div className="col-auto form-container">
                  <div className="form-label normal">pO2:</div>
                  <input type="text" className="form-input" />
                </div>
                <div className="col-auto form-container">
                  <div className="form-label normal">HCO3:</div>
                  <input type="text" className="form-input" />
                </div>
              </div>
              <div className="d-flex justify-start gap-1">
                <div className="col-auto form-container">
                  <div className="form-label normal">ABE:</div>
                  <input type="text" className="form-input" />
                </div>
                <div className="col-auto form-container">
                  <div className="form-label normal">SaO2:</div>
                  <input type="text" className="form-input" />
                </div>
                <div className="col-auto form-container">
                  <div className="form-label normal">ctCO2:</div>
                  <input type="text" className="form-input" />
                </div>
              </div>
            </div>
          </div>
          <div className="col checkboxes">
            <div className="row gap-1 align-centered content">
              <table className="col-12">
                {/* Adequate Oxygenation / hypoxemia */}
                <tr>
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
                  <td>
                    <div class="form-container">
                      <label htmlFor="hypoxemia" class="form-label uppercased">
                        hypoxemia
                      </label>
                      <input
                        type="checkbox"
                        id="hypoxemia"
                        class="form-checkbox"
                      />
                    </div>
                  </td>
                  <td></td>
                </tr>

                {/* Mild, Moderate, Severe */}
                <tr>
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
                      <input
                        type="checkbox"
                        id="moderate"
                        class="form-checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="form-container">
                      <label htmlFor="severe" class="form-label uppercased">
                        severe
                      </label>
                      <input
                        type="checkbox"
                        id="severe"
                        class="form-checkbox"
                      />
                    </div>
                  </td>
                  <td></td>
                </tr>
                {/* Respiratory, Acidosis, Uncompensated, Mild */}
                <tr>
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
                      <input
                        type="checkbox"
                        id="acidosis"
                        class="form-checkbox"
                      />
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
                        htmlFor="mild"
                        class="form-label col-auto uppercased">
                        mild
                      </label>
                      <input type="checkbox" id="mild" class="form-checkbox" />
                    </div>
                  </td>
                </tr>
                {/* metabolic, alkalosis, partially compensated, moderate */}
                <tr>
                  <td>
                    <div class="form-container">
                      <label
                        htmlFor="metabolic"
                        class="form-label col-auto uppercased">
                        metabolic
                      </label>
                      <input
                        type="checkbox"
                        id="metabolic"
                        class="form-checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="form-container">
                      <label
                        for="alkalosis"
                        class="form-label col-auto uppercased">
                        alkalosis
                      </label>
                      <input
                        type="checkbox"
                        id="alkalosis"
                        class="form-checkbox"
                      />
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
                        for="moderate"
                        class="form-label col-auto uppercased">
                        moderate
                      </label>
                      <input
                        type="checkbox"
                        id="moderate"
                        class="form-checkbox"
                      />
                    </div>
                  </td>
                </tr>
                {/* blank, blank , fully compensated, severe */}
                <tr>
                  <td></td>
                  <td></td>
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
                        htmlFor="severe"
                        class="form-label col-auto uppercased">
                        severe
                      </label>
                      <input
                        type="checkbox"
                        id="severe"
                        class="form-checkbox"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <div className="d-flex px-1">
                      <div
                        className="d-flex align-start"
                        style={{ gap: "0.3rem" }}>
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
                </tr>
              </table>
            </div>
            {/* Mixed */}
            <div className="footer ">
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
    </div>
  );
};

export default Index;
