export function reduzir(str, maxlength) {
   if (str?.length) {
      return str?.length > maxlength ? str?.slice(0, maxlength - 1) + "…" : str;
   }
}
