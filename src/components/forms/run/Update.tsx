import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useGetByIdQuery } from "../../../features/run/runDTOSlice";
import { setRunState } from "../../../features/run/runSlice";
import { IRunState } from "../../../types";
import { Loader } from "../../UI/Loader";
import { Run } from "./Run";

export const Update = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { data, isLoading, isSuccess } = useGetByIdQuery(Number(params.id));

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRunState(data as IRunState));
    }
  }, [isLoading, isSuccess, data, dispatch]);

  if (isLoading) return <Loader />;
  return <Run isUpdate={!!data} />;
};
