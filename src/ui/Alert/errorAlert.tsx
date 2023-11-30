import { Typography } from "src/ui/Typography/Typography";
import { toastAlert } from "src/ui/Alert/toastify";

export const errorAlert = (statusCode?: number) =>
  toastAlert({
    content: (
      <Typography component="div">
        Что-то пошло не так!
        {statusCode && <Typography>Код ошибки:{statusCode}</Typography>}
      </Typography>
    ),
    options: { type: "error" },
  });
