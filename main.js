async function testarLatencia() {
  try {
    const inicio = performance.now();
    await fetch(
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
      {
        cache: "no-store",
      }
    );

    const fim = performance.now();
    const latencia = fim - inicio;

    return latencia;
  } catch (e) {
    console.warn("Falha ao testar latência:", e);
    return Infinity; // ou qualquer valor indicando lentidão
  }
}

async function testarDownload() {
  const url = "https://speed.cloudflare.com/__down?bytes=5000000";

  try {
    const inicio = performance.now();
    const resposta = await fetch(url, { cache: "no-store" });
    const blob = await resposta.blob();
    const fim = performance.now();

    const tamanhoMB = blob.size / (1024 * 1024);
    const tempoSeg = (fim - inicio) / 1000;
    const velocidade = tamanhoMB / tempoSeg;
    //blob = null; // libera memória

    document.querySelector(".loader").style.display = "none";
    document.querySelector(".veloz").style.display = "block";

    return velocidade;
  } catch (err) {
    console.error("Erro ao medir download:", err);
    return 0; // assume internet muito lenta ou offline
  }
}

function btnSpeedTest() {
  document.querySelector(".loader").style.display = "block";
  document.querySelector(".veloz").style.display = "none";

  testarLatencia().then((latencia) => {
    console.log("Latência:", latencia, "ms");
    document.getElementById(
      "latence"
    ).innerText = `Latência: ${latencia.toFixed(2)} ms`;
    if (latencia > 300) console.log("Internet provavelmente lenta");
  });

  testarDownload().then((download) => {
    console.log("Velocidade:", download.toFixed(2), "MB/s");
    document.getElementById(
      "speed"
    ).innerText = `Velocidade: ${download.toFixed(2)} MB/s`;
  });
}
