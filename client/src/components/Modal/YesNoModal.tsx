import { YesNoModalWrap, YesNoTextWrap, ButtonWrap } from './styled';

type GreetingProps = {
  NO: () => void;
  YES: () => void;
  MESSAGE: string;
  MESSAGE2: string;
};

const YesNoModal = ({ NO, YES, MESSAGE, MESSAGE2 }: GreetingProps) => {
  return (
    <YesNoModalWrap onClick={(e) => e.stopPropagation()}>
      <button onClick={NO} className={'closeButton'}>
        &times;
      </button>
      <YesNoTextWrap>
        <div>
          {MESSAGE}
          <br />
          <strong>{MESSAGE2}</strong>
        </div>
      </YesNoTextWrap>
      <ButtonWrap>
        <button onClick={YES}>확인</button>
        <button onClick={NO} className="nobutton">
          아니요
        </button>
      </ButtonWrap>
    </YesNoModalWrap>
  );
};

export default YesNoModal;
