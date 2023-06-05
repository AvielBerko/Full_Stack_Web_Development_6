import {
  ListGroup,
  Card,
  ListGroupItem,
  InputGroup,
  Button,
  Form,
} from "react-bootstrap";
import Post from "../../../../lib/data/dataObjects/Post";
import Comment from "../../../../lib/data/dataObjects/Comment";
import { useEffect, useMemo, useState } from "react";
import User from "../../../../lib/data/dataObjects/User";

type CommentsListProps = {
  post: Post;
  user: User;
};

export default function CommentsList({ post, user }: CommentsListProps) {
  if (!post) return <></>;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentName, setNewCommentName] = useState<string>("");
  const [newCommentBody, setNewCommentBody] = useState<string>("");

  const getComments = useMemo(() => {
    return post.comments;
  }, [post.id]);

  const fetchComments = () => {
    getComments.then((comments) => {
      setComments(comments);
    });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = () => {
    const newComment = new Comment({
      postId: post.id,
      name: newCommentName,
      email: user.email,
      body: newCommentBody,
    });
    newComment.push();
    setComments((prev) => [newComment, ...prev]);
    setNewCommentBody("");
    setNewCommentName("");
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Comments</Card.Title>
        <ListGroup>
          <ListGroupItem>
            <InputGroup>
              <Button onClick={addComment}>Add Comment</Button>
              <Form.Control
                value={newCommentName}
                placeholder="Comment Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewCommentName(e.target.value)
                }
              />
              <Form.Control
                value={newCommentBody}
                placeholder=" Body"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewCommentBody(e.target.value)
                }
              />
            </InputGroup>
          </ListGroupItem>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <h5>{comment.name}</h5>
              <p>{comment.body}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
