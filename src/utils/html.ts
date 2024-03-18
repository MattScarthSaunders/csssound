export const setInnerText = (id: string, status: string) => {
  document.getElementById(id)!.innerText = status;
};

export const setDisableButton = (id: string, state: boolean) => {
  const btn = document.getElementById(id) as HTMLButtonElement;
  btn.disabled = state;
};
