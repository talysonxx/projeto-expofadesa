import { LerDados } from "./firebase.js";
var grafico = false;
async function renderChart() {
  try {
    const data = await LerDados(); // Aguarda a leitura dos dados
    if (data) {
        var valor1 = data.valor1;
        var valor2 = data.valor2;
      const xValues = ["valor 1", "Valor 2"];
      const yValues = [valor1, valor2];
      const barColors = ["#f59127", "#72a5f7"];

        if (grafico) {
            grafico.destroy();
        }

   grafico = new Chart("canvas", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Valores",
          },
          plugins: {
            legend: {
                display: false,
            }
        }
        },
      });
    }
  } catch (error) {
    console.error("Erro ao renderizar o gráfico", error);
  }
}
const form = document.getElementById("entradas");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  renderChart();
});
renderChart();
