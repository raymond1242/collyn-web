import { invalidDataNotification } from "@/components/Notification";

export function handleInvalidDataError(error: unknown): void {
  if (error instanceof Response) {
    error
      .json()
      .then((data) => ({
        data: data,
        status: error.status,
      }))
      .then((res) => {
        Object.keys(res.data).forEach((key) => {
          const errors: unknown = res.data[key];
          if (typeof errors === "string") {
            invalidDataNotification(errors);
          } else if (errors instanceof Array) {
            errors.forEach((error) => invalidDataNotification(error));
          }
        });
      });
  } else {
    console.error("Unexpected error", error);
  }
}
