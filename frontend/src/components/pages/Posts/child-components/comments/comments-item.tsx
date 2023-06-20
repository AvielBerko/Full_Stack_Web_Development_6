import { Card, Button } from "react-bootstrap";
import Comment from "../../../../../lib/data/dataObjects/Comment";
import { useState } from "react";
import EdibaleLabel from "../../../../edibaleLabel/edibale-label";


type CommentsItemProps = {
  comment: Comment;
  onDeleted: (comment: Comment) => void;
};

export default function CommentsItem({ comment, onDeleted }: CommentsItemProps) {
  const [commentName, setCommentName] = useState<string>( comment.name || "");
  const [commentBody, setCommentBody] = useState<string>( comment.body || "");
  const [isEditable, setIsEditable] = useState<Boolean>(false);

  const handleEdit = () => {
    setIsEditable(false);
    const newComment = new Comment({
      ...(comment.toUnknowObject() as any),
      name: commentName,
      body: commentBody,
    });
    newComment.save();
  };

  return (
        <div>
          {!isEditable && (
            <div>
              <h5>{commentName}</h5>
              <p>{commentBody}</p>
              <div className="d-flex gap-2">
                <Button onClick={() => setIsEditable(!isEditable)}>Edit</Button>
                <Button onClick={() => onDeleted(comment)}>Delete</Button>
              </div>
            </div>
          )}
          {isEditable && (
            <div >
               <EdibaleLabel
                isEditable={true}
                label="Title"
                setter={setCommentName}
                value={commentName}
                WrapperComponent={Card.Title}
              />
              <EdibaleLabel
                isEditable={true}
                label="Title"
                setter={setCommentBody}
                value={commentBody}
                WrapperComponent={Card.Title}
              />
              <div className="d-flex gap-2">
                <Button onClick={() => handleEdit()}>Save</Button>
              </div>
            </div>
          )}
        </div>
  );
}
