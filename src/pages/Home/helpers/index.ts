export const getSalaryString = (
  t: any,
  payment_from?: number,
  payment_to?: number,
  currency?: string
) => {
  let salaryString = "-";
  if (payment_from && !payment_to) {
    salaryString = `${t.from.toLowerCase()} ${payment_from}`;
  } else if (!payment_from && payment_to) {
    salaryString = `${t.to.toLowerCase()} ${payment_to}`;
  } else if (payment_from && payment_to) {
    salaryString = `${payment_from} - ${payment_to}`;
  }
  return `${t.sallaryShort} ${salaryString} ${currency}`;
};
