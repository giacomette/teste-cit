import { useState, useCallback } from "react";
import { schedule } from "../services/job";

export default function useExecuteSchedule() {
  const [listResult, setListResult] = useState();

  const handleExecuteSchedule = useCallback((item) => {
    const result = schedule([...item.jobs], item.start, item.end);

    setListResult(result);
  }, []);

  return {
    handleExecuteSchedule,
    listResult,
    clearResult: () => setListResult(),
  };
}
