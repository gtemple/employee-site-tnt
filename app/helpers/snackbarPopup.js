export function popupError(message) {
  return enqueueSnackbar(message, {
    autoHideDuration: 3000,
    variant: "error",
  });
}
