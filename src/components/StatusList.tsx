import React from "react";
import { CalendarToday } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { formatStatus } from "../utils/formatStatus";
import { IonRouterLink } from "@ionic/react";
import { dark } from "@mui/material/styles/createPalette";

interface StatusListProps {
  items: Record<string, any>[]; // or a more specific type if available
  label: string;
  status: string;
  date: string;
  longText: string;
  onhandlePreview: (requestId: string) => void;
}

const StatusList: React.FC<StatusListProps> = ({
  items,
  label,
  status,
  date,
  longText,
  onhandlePreview,
}) => {
  if (!items || items.length === 0) {
    return (
      <ul>
        <li>No Records Found.</li>
      </ul>
    );
  }

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <IonRouterLink
          key={index}
          color={"dark"}
          routerLink={`/abg-view/${item?.id}`}>
          <li className="border list-group-item mb-1 py-3">
            <span onClick={() => onhandlePreview(item?.id)}>
              <div>
                <p>{item[label]}</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                {formatStatus(item[status])}
                <Chip
                  label={item["date_text"]}
                  color="default"
                  size="small"
                  sx={{ p: 1 }}
                  icon={<CalendarToday />}
                />
              </div>
              <div>
                <hr />
                {item[longText]}
              </div>
            </span>
          </li>
        </IonRouterLink>
      ))}
    </ul>
  );
};

export default StatusList;
