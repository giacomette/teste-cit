import { useMemo } from "react";
import { useCallback, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Swal from "sweetalert2";

import useExecuteSchedule from "../../actions/useExecuteSchedule";
import CardJob from "./components/CardJob";
import ModalJob from "../ModalJob";
import { ContainerButtonExecute, ContainerResultSchedule } from "./styles";

function ModalSchedule({ open, value, onCancel, onSave }) {
  const {
    listResult,
    clearResult,
    handleExecuteSchedule,
  } = useExecuteSchedule();

  const [form, setForm] = useState();
  const [openModalJob, setOpenModalJob] = useState(false);
  const [job, setJob] = useState();

  useEffect(() => {
    setForm(value);
  }, [value]);

  useEffect(() => {
    if (!open) {
      clearResult();
    }
  }, [open, clearResult]);

  const handleClose = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleSave = useCallback(() => {
    if (!form?.title) {
      return Swal.fire("Aviso", "Informe o titulo do agendamento");
    }

    if (!form?.start) {
      return Swal.fire("Aviso", "Informe a data de inicio do agendamento");
    }

    if (!form?.end) {
      return Swal.fire("Aviso", "Informe a data de fim do agendamento");
    }

    if (!form.jobs?.length) {
      return Swal.fire("Aviso", "Informe pelo menos 1 job para o agendamento");
    }

    onSave(form);
  }, [onSave, form]);

  const onChange = useCallback((prop, v) => {
    setForm((prev) => ({
      ...prev,
      [prop]: v,
    }));
  }, []);

  const handleSaveJobs = useCallback(
    (jobSave) => {
      const jobs = form?.jobs ?? [];

      setOpenModalJob(false);
      setJob();

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

  const handleAddJob = useCallback(() => {
    setJob();
    setOpenModalJob(true);
  }, []);

  const handleClickJob = useCallback((v) => {
    setJob(v);
    setOpenModalJob(true);
  }, []);

  return (
    <>
      <ModalJob
        open={openModalJob}
        value={job}
        onCancel={() => {
          setOpenModalJob(false);
          setJob();
        }}
        onSave={(jobSave) => {
          handleSaveJobs(jobSave);
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Agendamento de jobs</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Titulo do Agendamento"
                  variant="outlined"
                  value={form?.title}
                  fullWidth
                  onChange={(ev) => onChange("title", ev.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Data de inicio da Janela"
                  type="datetime-local"
                  value={form?.start}
                  inputProps={{
                    max: form?.end,
                  }}
                  variant="outlined"
                  fullWidth
                  onChange={(ev) => onChange("start", ev.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Data de Fim da Janela"
                  type="datetime-local"
                  variant="outlined"
                  fullWidth
                  value={form?.end}
                  inputProps={{
                    min: form?.start,
                  }}
                  onChange={(ev) => onChange("end", ev.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item sm={3} xs={6}>
                  <h3>Jobs</h3>
                </Grid>

                <Grid item sm={9} xs={6}>
                  <div style={{ float: "right", marginTop: 10 }}>
                    <Button
                      onClick={() => handleAddJob()}
                      color="primary"
                      variant="outlined"
                    >
                      Adicionar
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {form?.jobs?.map((job, key) => (
                <CardJob
                  key={key}
                  value={job}
                  onClick={() => handleClickJob(job)}
                />
              ))}
            </Grid>

            {form?.jobs?.length ? (
              <ContainerButtonExecute>
                <Button
                  onClick={() => handleExecuteSchedule(form)}
                  color="secondary"
                  variant="outlined"
                >
                  Executar Jobs
                </Button>
              </ContainerButtonExecute>
            ) : null}

            {listResult ? (
              <ContainerResultSchedule>
                <pre>{JSON.stringify(listResult)}</pre>
              </ContainerResultSchedule>
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            autoFocus
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalSchedule;
