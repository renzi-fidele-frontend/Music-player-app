// Convertendo segundos para minutos
export function secToMin(secs) {
   let minutos = Math.floor(secs / 600);
   let segundos = (secs % 600).toFixed(0);
   return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
}
