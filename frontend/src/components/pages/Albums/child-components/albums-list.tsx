import { ListGroup } from "react-bootstrap";
import { useSession } from "../../../../hooks/use-session-storage/use-session";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useMemo, useState } from "react";
 import Album from "../../../../lib/data/dataObjects/Album";
 import AlbumsItem from "./albums-item";
import { Nullable } from "../../../../src/types/react.types";
import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";

export default function AlbumsList() {
  const [user, _] = useSession<Nullable<User>>(
    "user",
    null,
    UserSerializer
  );
  const [albums, setAlbums] = useState<Album[]>([]);

  if (!user?.id) return <></>;

    const getAlbums = useMemo(()=>{
      return user.albums;
    },[user.id])

  useEffect(() => {
    getAlbums.then((albums) => {
        setAlbums(albums);
    });
  }, [user]);

  const albumsDOM = albums.map((album: Album) => {
    return <AlbumsItem album={album} key={album.id} forceShowPhotos={false}/>;
  });

  return <ListGroup>{albumsDOM}</ListGroup>;
}
