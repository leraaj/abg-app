import { useAuthContext } from "./useAuthContext";
import useFetchPositions from "../auth/useFetchPositions";

const useFetchUserPosition = () => {
  const { user } = useAuthContext();
  const { positions } = useFetchPositions();
  const position = positions.find((pos) => pos?.id === user?.position_id);
  return { position: { id: position?.id, type: position?.type } };
};

export default useFetchUserPosition;
