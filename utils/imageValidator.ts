export const imageValidator = (target: HTMLInputElement) => {
  // let data: File | undefined | null,
  //   error: string | undefined | null,
  //   dURL: string | undefined | null;

  const validate = reactive<{
    data: File | undefined | null;
    error: string | undefined | null;
    dURL: string | undefined | null;
  }>({ data: null, error: null, dURL: null });

  let file = target?.files![0];

  const fileSize = Math.round(file?.size / 1024);

  if (fileSize <= 512) {
    validate.data = file;
    validate.error = null;
    validate.dURL = URL.createObjectURL(file);
  } else {
    validate.error = "Oops... Image to large";
    validate.data = null;
    validate.dURL = null;
  }

  return {
    validate,
  };
};
