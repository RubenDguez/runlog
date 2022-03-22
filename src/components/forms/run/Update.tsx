import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setRunState } from "../../../store/features/run/runSlice";
import { Loader } from "../../UI/Loader";
import { Run } from "./Run";

export const Update = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [runList] = useAppSelector((state) => [state.runList]);

  const runUpdate = useMemo(() => {
    return runList.find((f) => f.id === Number(params.id));
  }, [params.id, runList]);

  useEffect(() => {
    if (runUpdate) {
      const {
        atPickUp,
        baseEntity,
        baseRate,
        emptyCash,
        emptyRate,
        links,
        loadedCash,
        minMiles,
        secondLoadRate,
        totalTrip,
        userId,
        weekNumber,
        year,
        ...rest
      } = runUpdate;
      dispatch(setRunState(rest));
    }
  }, [runUpdate, dispatch]);

  if (!runUpdate) return <Loader />;
  return <Run id={Number(params.id)} isUpdate={!!runUpdate} />;
};
