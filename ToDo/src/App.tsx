import { useState } from "react";
import "./App.css";
import ImageHeader from "./components/imageHeader.tsx";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValues.trim()) {
      if (editIndex !== null) {
        const updatedItems = [...items];
        updatedItems[editIndex] = inputValues;
        setItems(updatedItems);
        setEditIndex(null);
      } else {
        setItems(prev => [...prev, inputValues]);
      }
      setInputValues('');
    }
  };

  const handleComplete = (item: string) => {
    setCompletedItems(prev => [...prev, item]);
    setItems(prev => prev.filter(i => i !== item));
  };

  const handleDelete = (item: string) => {
    setItems(prev => prev.filter(i => i !== item));
    setCompletedItems(prev => prev.filter(i => i !== item));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(items[index]);
    setInputValues(items[index]);
  };

  const handleUpdate = () => {
    if (editIndex !== null && editValue.trim()) {
      const updatedItems = [...items];
      updatedItems[editIndex] = editValue;
      setItems(updatedItems);
      setEditIndex(null);
      setEditValue('');
      setInputValues('');
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <ImageHeader />

      <div className="w-[600px]">
        <form className="mb-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Something..."
            className="mb-5 w-full p-3 rounded"
            onChange={(e) => setInputValues(e.target.value)}
            value={inputValues}
          />
          <button className="w-full p-2 bg-slate-800 text-white" type="submit">
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        <div className="flex gap-4">
          {items.length > 0 && (
            <div className="mt-9 h-52 overflow-y-auto border border-slate-500 p-2 flex-1">
              <h1 className="m-10 font-bold">Tasks</h1>
              {items.map((data, index) => (
                <div key={data} className="flex justify-between border rounded border-slate-400 p-3 my-2">
                  <p>{data}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleComplete(data)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="25"
                        height="25"
                        fill="#00b4f9"
                      >
                        <path d="M24 0a24 24 0 1 0 24 24A24 24 0 0 0 24 0Zm0 44a20 20 0 1 1 20-20 20 20 0 0 1-20 20Z" />
                        <path d="m20 29.17-6.59-6.58-2.82 2.82L20 34.83l17.41-17.42-2.82-2.82L20 29.17z" />
                      </svg>
                    </button>
                    <button onClick={() => handleEdit(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        baseProfile="tiny"
                        version="1.2"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#00b4f9"
                      >
                        <path d="M21.561 5.318l-2.879-2.879A1.495 1.495 0 0 0 17.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06zM11.5 14.672L9.328 12.5l6.293-6.293 2.172 2.172-6.293 6.293zm-2.561-1.339l1.756 1.728L9 15l-.061-1.667zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29.464-.19.896-.347 1.188-.64L16 13v6zm2.5-11.328L16.328 5.5l1.293-1.293 2.171 2.172L18.5 7.672z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(data)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="#fff"
                      >
                        <circle cx="8.018" cy="8.018" r="12.5" fill="#3a6c87" />
                        <path
                          fill="#2f4b6c"
                          d="M14.867 24.764a12.5 12.5 0 0 0 .977-.22 12.5 12.5 0 0 0 1.185-.394 12.5 12.5 0 0 0 1.14-.51 12.5 12.5 0 0 0 1.085-.622 12.5 12.5 0 0 0 1.016-.727 12.5 12.5 0 0 0 .939-.824 12.5 12.5 0 0 0 .852-.914 12.5 12.5 0 0 0 .755-.994 12.5 12.5 0 0 0 .655-1.067 12.5 12.5 0 0 0 .543-1.125 12.5 12.5 0 0 0 .427-1.174 12.5 12.5 0 0 0 .309-1.21 12.5 12.5 0 0 0 .018-.112l-7.32-7.318A6.978 6.978 0 0 0 12.5 5.5c-3.86 0-7 3.14-7 7 0 1.447.442 2.793 1.197 3.91v.002c.126.186.26.365.403.537v.002c.142.173.295.338.453.496l7.314 7.317z"
                        />
                        <path
                          d="M8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7Zm0 1c3.32 0 6 2.68 6 6s-2.68 6-6 6-6-2.68-6-6 2.68-6 6-6ZM5.525 4.818l-.707.707L7.293 8l-2.475 2.477.707.707L8 8.707l2.477 2.477.707-.707L8.707 8l2.477-2.475-.707-.707L8 7.293 5.525 4.818Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {completedItems.length > 0 && (
            <div className="mt-9 h-52 overflow-y-auto border border-slate-500 p-2 flex-1">
              <h1 className="m-10 font-bold">Completed</h1>
              {completedItems.map((data) => (
                <div key={data} className="flex justify-between border rounded border-slate-400 p-3 my-2">
                  <p>{data}</p>
                  <button onClick={() => handleDelete(data)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="#fff"
                    >
                      <circle cx="8.018" cy="8.018" r="12.5" fill="#3a6c87" />
                      <path
                        fill="#2f4b6c"
                        d="M14.867 24.764a12.5 12.5 0 0 0 .977-.22 12.5 12.5 0 0 0 1.185-.394 12.5 12.5 0 0 0 1.14-.51 12.5 12.5 0 0 0 1.085-.622 12.5 12.5 0 0 0 1.016-.727 12.5 12.5 0 0 0 .939-.824 12.5 12.5 0 0 0 .852-.914 12.5 12.5 0 0 0 .755-.994 12.5 12.5 0 0 0 .655-1.067 12.5 12.5 0 0 0 .543-1.125 12.5 12.5 0 0 0 .427-1.174 12.5 12.5 0 0 0 .309-1.21 12.5 12.5 0 0 0 .018-.112l-7.32-7.318A6.978 6.978 0 0 0 12.5 5.5c-3.86 0-7 3.14-7 7 0 1.447.442 2.793 1.197 3.91v.002c.126.186.26.365.403.537v.002c.142.173.295.338.453.496l7.314 7.317z"
                      />
                      <path
                        d="M8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7Zm0 1c3.32 0 6 2.68 6 6s-2.68 6-6 6-6-2.68-6-6 2.68-6 6-6ZM5.525 4.818l-.707.707L7.293 8l-2.475 2.477.707.707L8 8.707l2.477 2.477.707-.707L8.707 8l2.477-2.475-.707-.707L8 7.293 5.525 4.818Z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editIndex !== null && (
        <div className="mt-5">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="p-2 border rounded"
          />
          <button onClick={handleUpdate} className="ml-2 p-2 bg-slate-800 text-white">
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
