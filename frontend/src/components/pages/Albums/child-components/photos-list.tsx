import { Row, Col, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Album from "../../../../lib/data/dataObjects/Album";
import { useEffect, useMemo, useState } from "react";
import Photo from "../../../../lib/data/dataObjects/Photo";
import ImageModal from "./image-modal";

type PhotosListProps = {
  album: Album;
};
const PHOTOS_IN_PAGE = 12;

export default function PhotosList({ album }: PhotosListProps) {
  if (!album) return <></>;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Photo | undefined>(
    undefined
  );

  const getPhotos = useMemo(() => {
    return album.photos(page, PHOTOS_IN_PAGE);
  }, [page, album]);

  const fetchPhotos = async () => {
    console.log("fetching photos");
    try {
      getPhotos.then((newPhotos) => {
        if (newPhotos.length === 0) {
          setHasMore(false);
        }
        console.log("fetch complete");
        setPhotos((prevPhotos) => {
          const combined = [...prevPhotos, ...newPhotos];
          const unique = combined.filter((photo, index, self) => {
            return index === self.findIndex((p) => p.id === photo.id);
          });
          if (unique.length > prevPhotos.length) {
            // Update page number and check if there is more data available
            setPage((prevPage) => prevPage + 1);
          }
          return unique;
        });
      });

      
    } catch (error) {
      console.error("Error fetching Photos: ", error);
    }
  };

  const closeModal = () => {
    setSelectedImage(undefined);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchPhotos}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.5}
        endMessage={<p>No more photos to load.</p>}
      >
        <Row>
          {photos.map((photo) => (
            <Col key={photo.id} md={3} className="text-center">
              <Image
                thumbnail
                src={photo.thumbnailUrl}
                alt={photo.title}
                onClick={() => {
                  setSelectedImage(photo);
                }}
              />
              <h4>{photo.title}</h4>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
      <ImageModal close={closeModal} image={selectedImage} />
    </>
  );
}
