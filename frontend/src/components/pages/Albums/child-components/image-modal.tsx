import { Image, Modal } from "react-bootstrap";
import Photo from "../../../../lib/data/dataObjects/Photo";

type ImageModalProps = {
  close: () => void;
  image?: Photo;
};

export default function ImageModal({ close, image }: ImageModalProps) {
  const show = image != undefined;
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{image?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={image?.url} about={image?.title} rounded fluid />
      </Modal.Body>
    </Modal>
  );
}
