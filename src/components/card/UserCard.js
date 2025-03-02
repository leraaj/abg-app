import Button from "../button/Button";
import "./userCard.css";
import rightIcon from "../../assets/icons/chevron-right.svg";
const UserCard = ({ name, date, status, onClick }) => {
  return (
    <div className="user-card">
      <div className="col row gap">
        <span className="card-name">{name}</span>
        <span className="card-bdate">{date || "XXX-XX-XXX"}</span>
        <span className="card-status">
          {status == 1 ? "Pending" : "For Releasing"}
        </span>
      </div>
      <div className="col-auto">
        <div className="col-auto d-flex justify-centered align-centered ">
          {onClick && (
            <Button icon={rightIcon} btnStyle={"next"} onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
