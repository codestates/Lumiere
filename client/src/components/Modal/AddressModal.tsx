/* eslint-disable */
import DaumPostcode from 'react-daum-postcode';
import { OrderDeliver } from 'util/type';
import { ModalBackdrop, AddWrap } from './styled';

type Props = {
  clickModalHandler: () => void;
  setDeliverInfo: (data: OrderDeliver) => void;
  deliverInfo: {
    deliver: {
      address: string;
      receiver: string;
      request: string;
    };
  };
};

const AddressModal = ({
  clickModalHandler,
  setDeliverInfo,
  deliverInfo,
}: Props) => {
  const postCodeStyle: object = {};

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
    setDeliverInfo({
      deliver: {
        address: result,
        receiver: deliverInfo.deliver.receiver,
        request: deliverInfo.deliver.request,
      },
    });

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
