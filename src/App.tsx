import { v4 as uuid } from 'uuid';
// component
import Items from './components/Items';
// store
import { useSectionStore } from './store';
// utils
import { onSubmit, onInputChange, onEdit, onReplay } from './utils';
// style
import './App.css';

export type SectionType = {
  id: string;
  isEdit?: boolean;
  comment: string;
  children: SectionType[];
};

function App() {
  const section = useSectionStore((state) => state.section);
  const setSection = useSectionStore((state) => state.setSection);

  const handleAddComment = () => {
    const payload = {
      id: uuid(),
      comment: '',
      isEdit: true,
      children: [],
    };
    setSection([...section, payload]);
  };

  const handleSubmitComment = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const _section = onSubmit(section, id);
    setSection(_section);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;
    const _section = onInputChange(section, value, id);
    setSection(_section);
  };

  const handleOnReplay = (id: string) => {
    const _section = onReplay(section, id);
    setSection(_section);
  };

  const handleOnEdit = (id: string) => {
    const _section = onEdit(section, id);
    setSection(_section);
  };

  return (
    <div className="container">
      <p>Comment section</p>
      <div className="wrapper">
        <button className="btn" onClick={handleAddComment}>
          Add Comment
        </button>
        <div className="section-wrapper">
          {section.length ? (
            section.map((sec) => {
              return (
                <Items
                  key={sec.id}
                  handleSubmit={handleSubmitComment}
                  handleOnChange={handleOnChange}
                  handleOnEdit={handleOnEdit}
                  handleOnReplay={handleOnReplay}
                  {...sec}
                />
              );
            })
          ) : (
            <p className="no-comment">No Comments</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
