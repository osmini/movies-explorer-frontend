import DecoreLineGrey  from '../DecoreLineGrey/DecoreLineGrey';
import Progres  from '../Progres/Progres';


// в даном компоненте мы не принимаем props аргумент
function AboutProject(){

  // возвращаем jsx разметку компонента
  return (
    <section className="aboutProject" id="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>

      <DecoreLineGrey />

      <section className="aboutProject__articles">
        <article className="aboutProject__articl">
          <h3 className="aboutProject__articl-title">Дипломный проект включал 5 этапов</h3>
          <p className="aboutProject__articl-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>

        <article className="aboutProject__articl">
          <h3 className="aboutProject__articl-title">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutProject__articl-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </section>

      <Progres />

    </section>
  );
}

// экспортируем компонент в основной код
export default AboutProject;