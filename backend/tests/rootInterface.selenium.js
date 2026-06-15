const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { app } = require('../src/app');

async function criarServidorLocal() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      resolve({ server, url: `http://127.0.0.1:${port}/` });
    });
  });
}

async function executarTeste() {
  const { server, url } = await criarServidorLocal();
  const options = new chrome.Options()
    .addArguments('--headless=new')
    .addArguments('--no-sandbox')
    .addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(url);

    const textoPagina = await driver.findElement(By.css('body')).getText();

    if (!textoPagina.includes('MangaBrasil API')) {
      throw new Error('A resposta da interface nao contem "MangaBrasil API".');
    }

    if (!textoPagina.includes('online')) {
      throw new Error('A resposta da interface nao contem o status "online".');
    }

    console.log('Teste Selenium concluido com sucesso.');
  } finally {
    await driver.quit();
    await new Promise((resolve) => server.close(resolve));
  }
}

executarTeste().catch((error) => {
  console.error('Teste Selenium falhou:', error.message);
  process.exit(1);
});
