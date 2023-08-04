import DecoreLineGrey  from '../DecoreLineGrey/DecoreLineGrey';


// в даном компоненте мы не принимаем props аргумент
function Progres(){

  // возвращаем jsx разметку компонента
  return (
    <section className="progres">
      <div className="progres__bask">
        <div className="progres__bask-bar">1 неделя</div>
        <p className="progres__bask-title">Back-end</p>
      </div>

      <div className="progres__front">
        <div className="progres__front-bar">4 недели</div>
        <p className="progres__front-title">Front-end</p>
      </div>

    </section>
  );
}

// экспортируем компонент в основной код
export default Progres;