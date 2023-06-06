import { ListGroupItem, Card, Button } from "react-bootstrap";
import Post from "../../../../lib/data/dataObjects/Post";
import { useState } from "react";
import { Nullable, StateSetter } from "../../../../types/react.types";
import CommentsList from "./comments-list";
import User from "../../../../lib/data/dataObjects/User";
import EdibaleLabel from "../../../edibaleLabel/edibale-label";

type PostItemProps = {
  post: Post;
  onDeleted: (post: Post) => void;
  user: User;
  selectedPost: Nullable<string>;
  setSelectedPost: StateSetter<Nullable<string>>;
};

export default function PostsItem({
  post,
  onDeleted,
  user,
  selectedPost,
  setSelectedPost,
}: PostItemProps) {
  if (!post) return <></>;

  const [showComments, setShowComments] = useState<Boolean>(false);
  const [isEditable, setIsEditable] = useState<Boolean>(false);
  const [postState, setPostState] = useState<Post>(post);
  const [postTitle, setPostTitle] = useState<string>(post.title || "");
  const [postBody, setPostBody] = useState<string>(post.body || "");

  const selected = selectedPost === post.id;

  const handleEdit = () => {
    setIsEditable(false);
    const newPost = new Post({
      ...(postState.toUnknowObject() as any),
      title: postTitle,
      body: postBody,
    });
    setPostState(newPost);
    newPost.save();
  };

  return (
    <ListGroupItem>
      <div onClick={() => setSelectedPost(postState.id)}>
        <Card>
          {isEditable && (
            <Card.Body>
              <EdibaleLabel
                isEditable={true}
                label="Title"
                setter={setPostTitle}
                value={postTitle}
                WrapperComponent={Card.Title}
              />
              <EdibaleLabel
                isEditable={true}
                label="Body"
                setter={setPostBody}
                value={postBody}
                WrapperComponent={Card.Text}
              />
              <Button onClick={() => handleEdit()}>Save</Button>
            </Card.Body>
          )}
          {!isEditable && (
            <Card.Body>
              <Card.Title style={{ fontWeight: selected ? "bold" : "normal" }}>
                {postState.title}
              </Card.Title>
              <Card.Text style={{ fontWeight: selected ? "bold" : "normal" }}>
                {postState.body}
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Button onClick={() => setShowComments(!showComments)}>
                  {showComments ? "Hide Comments" : "Show Comments"}
                </Button>
                <div className="d-flex gap-2">
                  <Button onClick={() => setIsEditable(!isEditable)}>
                    Edit
                  </Button>
                  <Button onClick={() => onDeleted(postState)}>Delete</Button>
                </div>
              </div>
            </Card.Body>
          )}
        </Card>

        {showComments && <CommentsList post={postState} user={user} />}
      </div>
    </ListGroupItem>
  );
}
