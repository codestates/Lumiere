/* eslint-disable */
import DaumPostcode from 'react-daum-postcode';
import { OrderDeliver } from 'util/type';
import { ModalBackdrop, AddWrap } from './styled';

type Props = {
  clickModalHandler: () => void;
  shippingState: {
    address: string;
    detailedAddress: string;
    receiver: string;
    contactNum: string;
  };
  setShippingState: (data: OrderDeliver) => void;
};

const AddressModal = ({
  clickModalHandler,
  shippingState,
  setShippingState,
}: Props) => {
  const onCompletePost = (data: any) => {
    let fullAddr = data.address;
    let zonecode = data.zonecode;
    let extraAddr = '';
    let result = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }
    result = `[${zonecode}] ${fullAddr}`;
    setShippingState({ ...shippingState, address: result });
    clickModalHandler();
  };

  return (
    <ModalBackdrop onClick={clickModalHandler}>
      <AddWrap onClick={(e) => e.stopPropagation()}>
        <DaumPostcode onComplete={onCompletePost} />
      </AddWrap>
    </ModalBackdrop>
  );
};
export default AddressModal;
