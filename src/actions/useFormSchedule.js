import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

export default function useFormSchedule(defaultValue) {
  const [form, setForm] = useState();

  useEffect(() => {
    setForm(defaultValue);
  }, [defaultValue]);

  const onChange = useCallback((prop, v) => {
    setForm((prev) => ({
      ...prev,
      [prop]: v,
    }));
  }, []);

  const handleSaveJobs = useCallback(
    (jobSave) => {
      const jobs = form?.jobs ?? [];

      if (!jobSave.id) {
        onChange("jobs", [...jobs, { id: jobs.length + 1, ...jobSave }]);
        return;
      }

      const newJobs = form.jobs.map((item) => {
        if (item.id === jobSave.id) {
          return jobSave;
        }

        return item;
      });

      onChange("jobs", newJobs);
    },
    [form, onChange]
  );

  const validateBeforeSave = useCallback(() => {
    if (!form?.title) {
      return "Informe o titulo do agendamento";
    }

    if (!form?.start) {
      return "Informe a data de inicio do agendamento";
    }

    if (!form?.end) {
      return "Informe a data de fim do agendamento";
    }

    if (!form.jobs?.length) {
      return "Informe pelo menos 1 job para o agendamento";
    }

    return null;
  }, [form]);

  return {
    form,
    onChange,
    validateBeforeSave,
    handleSaveJobs,
  };
}
