import React, { memo } from 'react';
// utils
import { SectionType } from '../App';
// icons
import { IconRocket, IconEdit, IconMessage } from '@tabler/icons-react';

type ItemsProps = {
  handleSubmit: (e: React.FormEvent, id: string) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleOnEdit: (id: string) => void;
  handleOnReplay: (id: string) => void;
} & SectionType;

const Items = memo((props: ItemsProps) => {
  const {
    id,
    isEdit,
    comment,
    children,
    handleSubmit,
    handleOnChange,
    handleOnEdit,
    handleOnReplay,
  } = props;

  return (
    <>
      <div className="comment-container">
        {isEdit ? (
          <form onSubmit={(e) => handleSubmit(e, id)}>
            <div className='input-wrapper'>
              <input
                className={`input`}
                value={comment}
                onChange={(e) => handleOnChange(e, id)}
              />
              <button className="btn fit-content" type="submit">
                <div className="btn-text">
                  <p>Submit</p>
                  <IconRocket />
                </div>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-wrapper">
            <div className="comment-wrapper">
              <p className="comment-text">{comment}</p>
              <IconEdit onClick={() => handleOnEdit(id)} className="cursor" />
            </div>
            <div className="replay-section" onClick={() => handleOnReplay(id)}>
              <IconMessage />
              <p className="replay-txt">Replay</p>
            </div>
          </div>
        )}
      </div>
      {children.length
        ? children.map((node) => (
            <div className="has-children" key={node.id}>
              <Items
                handleOnChange={handleOnChange}
                handleOnEdit={handleOnEdit}
                handleOnReplay={handleOnReplay}
                handleSubmit={handleSubmit}
                {...node}
              />
            </div>
          ))
        : null}
    </>
  );
});

export default Items;
