// в даном компоненте мы не принимаем props аргумент
function Techs(){

  // возвращаем jsx разметку компонента
  return (
    <section className="techs" id="techs">
      <div className="techs__wripper">
        <h2 className="techs__title">Технологии</h2>

        <h2 className="techs__heder">7 технологий</h2>
        <p className="footer__lide">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

        <ul className="techs__spisok">
          <li className="techs__spisok-item">HTML</li>
          <li className="techs__spisok-item">CSS</li>
          <li className="techs__spisok-item">JS</li>
          <li className="techs__spisok-item">React</li>
          <li className="techs__spisok-item">Git</li>
          <li className="techs__spisok-item">Express.js</li>
          <li className="techs__spisok-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

// экспортируем компонент в основной код
export default Techs;