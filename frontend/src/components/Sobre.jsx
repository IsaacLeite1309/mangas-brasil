import './Sobre.css';

export default function Sobre() {
  return (
    <section className="sobre-container">
      <h2>Sobre o MangaBrasil</h2>
      
      <p>
        O <strong>MangaBrasil</strong> é uma plataforma dedicada à catalogação, organização e preservação 
        histórica das publicações de mangás no Brasil. Nosso objetivo é criar um acervo digital 
        completo onde colecionadores e fãs possam registrar e consultar detalhes sobre suas obras favoritas.
      </p>

      <h3>Principais Funcionalidades</h3>
      <ul className="sobre-features">
        <li><strong>Catálogo Dinâmico:</strong> Visualize todos os mangás em uma grade intuitiva e elegante.</li>
        <li><strong>Busca em Tempo Real:</strong> Encontre rapidamente qualquer mangá pelo título ou nome do autor.</li>
        <li><strong>Cadastro Detalhado:</strong> Registre informações cruciais como autor, editora, edição e formato</li>
      </ul>

      <div className="sobre-footer"></div>
    </section>
  );
}