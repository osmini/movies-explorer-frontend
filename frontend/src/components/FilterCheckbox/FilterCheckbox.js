function FilterCheckbox(){

  return (

        <label className="filterCheckbox hoverBatton">
          <div className="filterCheckbox__wrapper">
              <input className="filterCheckbox__input" type="checkbox"/>
              <span className="filterCheckbox__tumbler" />
          </div>
          <p className="filterCheckbox__text">Короткометражки</p>
        </label>

  );
}

export default FilterCheckbox;