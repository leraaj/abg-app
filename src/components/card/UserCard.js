import Button from "../button/Button";
import "./userCard.css";
import rightIcon from "../../assets/icons/chevron-right.svg";
import useFormattedDate from "../../hooks/useFormattedDate";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
const UserCard = ({ name, date, status, diagnosis, onClick }) => {
  const { user } = useAuthContext();
  return (
    <div className="user-card">
      <div className="col row gap-2 px-2">
        <span className="card-name ">{name}</span>
        {/* <span className="card-bdate ">{useFormattedDate(date)}</span> */}
        <span className="card-subtle ">{diagnosis}</span>
        <span
          className={`card-status ${
            status === 0
              ? ""
              : status === 1
              ? "bg-warning"
              : status === 2
              ? "bg-success text-light"
              : ""
          }`}>
          {status == 0
            ? "Pending"
            : status == 1
            ? "In-progress"
            : "For Releasing"}
        </span>
      </div>
      {user && (
        <div className="col-auto">
          <div className="col-auto d-flex justify-centered align-centered ">
            {onClick && (
              <Button icon={rightIcon} btnStyle={"next"} onClick={onClick} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
