// Convertendo millisegundos para minutos
export function milliToMin(millis) {
   let minutos = Math.floor(millis / 60000);
   let segundos = ((millis % 60000) / 1000).toFixed(0);
   return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
}
