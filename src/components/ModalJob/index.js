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

function ModalJob({ open, value, onCancel, onSave }) {
  const [form, setForm] = useState();

  useEffect(() => {
    setForm(value);
  }, [open, value]);

  const handleClose = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleSave = useCallback(() => {
    if (!form?.description) {
      return Swal.fire("Aviso", "Informe o titulo do job");
    }

    if (!form?.maxExecutionDate) {
      return Swal.fire("Aviso", "Informe a data máxima de conclusão");
    }

    if (!form?.estimatedTime) {
      return Swal.fire("Aviso", "Informe o tempo estimado em hora");
    }

    onSave(form);
  }, [onSave, form]);

  const onChange = useCallback((prop, v) => {
    setForm((prev) => ({
      ...prev,
      [prop]: v,
    }));
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Job</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Titulo do Job"
                variant="outlined"
                value={form?.description}
                fullWidth
                onChange={(ev) => onChange("description", ev.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Data máxima de conclusão"
                type="datetime-local"
                value={form?.maxExecutionDate}
                variant="outlined"
                fullWidth
                onChange={(ev) => onChange("maxExecutionDate", ev.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Tempo estimado em hora"
                variant="outlined"
                type="number"
                value={form?.estimatedTime}
                fullWidth
                onChange={(ev) =>
                  onChange("estimatedTime", Number(ev.target.value ?? 0))
                }
              />
            </FormControl>
          </Grid>
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
  );
}

export default ModalJob;
