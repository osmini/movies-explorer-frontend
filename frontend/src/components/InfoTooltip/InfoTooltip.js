import union from '../../images/Union1.svg';
import union2 from '../../images/Union2.svg';

function InfoTooltip(props){

  const{ onClose, tooltipPopupOpen, registrIn, regAnsve} = props;

  return (
    <section className= {!tooltipPopupOpen ? ("InfoTooltip") : ("InfoTooltip InfoTooltip_active")} aria-label="форма попапа">
    
      <div className="InfoTooltip__eddit-form">
        <button className="InfoTooltip__close-button hoverBatton" onClick={onClose}  type="button" aria-label="кнопка закрыть попап"/>
    
        <img src={registrIn ? union : union2} alt={registrIn ? ('Регистрация прошла успешно.') : ('Регистрация не прошла.')} className='InfoTooltip__infotooltip-image'/>
        
          <p className='InfoTooltip__infotooltip-message'>
            {regAnsve}
          </p>
      </div>
    </section>
  );

}

export default InfoTooltip;