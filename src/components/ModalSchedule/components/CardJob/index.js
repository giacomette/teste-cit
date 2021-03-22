import Grid from "@material-ui/core/Grid";
import { Card, CardContent } from "@material-ui/core";
import moment from "moment";

import { Container, CardJobId, CardJobLabel, CardJobTitle } from "./styles";

function CardJob({ value, onClick }) {
  return (
    <Container onClick={onClick}>
      <Card elevation={2}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <CardJobId data-testid={`job-id-${value.id}`}>
                {value.id}
              </CardJobId>
            </Grid>
            <Grid item xs={10}>
              <CardJobTitle data-testid={`job-title-${value.id}`}>
                {value.description}
              </CardJobTitle>

              <div>
                <CardJobLabel>
                  Data máxima de conclusão:{" "}
                  <span data-testid={`job-max-execution-date-${value.id}`}>
                    {moment(value.maxExecutionDate).format("DD/MM/YYYY HH:mm")}
                  </span>
                </CardJobLabel>
              </div>

              <div>
                <CardJobLabel data-testid={`job-estimated-time-${value.id}`}>
                  Tempo estimado (Hora): {value.estimatedTime}
                </CardJobLabel>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CardJob;
