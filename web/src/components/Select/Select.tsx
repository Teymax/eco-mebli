import useOutsideClick from "../../hooks/useOutsideClick";
import { FunctionComponent, useRef, useState } from "react";
import "./styles/Select.scss";
import React from "react";
import { number } from "yup";

export interface ISelect {
  options: [string, number][];
  value: number;
  onClick: (arg: number) => void;
}

const Select: FunctionComponent<ISelect> = ({
  options,
  value,
  onClick
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectRef, () => setIsOpenSelect(false));

  return (
    <div className="select" ref={selectRef}>
      <p
        className="mainContainer"
        onClick={() => setIsOpenSelect((previous) => !previous)}
      >
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="292.362px"
          height="292.362px"
          viewBox="0 0 292.362 292.362"
          xmlSpace="preserve"
          className={isOpenSelect ? "arrow arrow-open" : "arrow"}
        >
          <g>
            <path
              d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
			C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
			s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
            />
          </g>
        </svg>
        <span className="material-name">{options[value][0]} </span>
        <span className="material-price">{options[value][1]} ГРН/ПГ.М.</span>
      </p>
      {isOpenSelect && (
        <div className="optionsContainer">
          {options.map((item, id) => (
            <p
              className="option"
              key={id}
              onClick={() => {
                onClick(id);
                setIsOpenSelect(false);
              }}
            >
              <span className="material-name">{item[0]} </span>
              <span className="material-price">{item[1]} ГРН/ПГ.М.</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
