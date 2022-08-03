import logo from './logo.svg';
import './App.css';


function App() {
  let openPicker = async () => {
    const filePath = await window.pageApi.exampleFilePicker()
    console.log(filePath);
  }
  return (
    <div className="bg-slate-900 text-slate-200 p-2 min-h-screen flex">
      <div className='max-w-xl flex-col  space-y-5'>
        <div className='flex-col'>
          <button className='block w-full text-left p-3 border-slate-700 hover:bg-slate-800'>Menu 1</button>
          <button className='block w-full text-left p-3 border-slate-700 hover:bg-slate-800'>Menu 12345</button>
          <button className='block w-full text-left p-3 border-slate-700 hover:bg-slate-800'>Menu 1</button>
        </div>
        <div className='text-center p-3 rounded-xl border-2 border-slate-700 hover:bg-slate-800'>Config</div>
        
      </div>
      <div className='grow'>
        <button type="button" id="btn" onClick={openPicker}>Open a File</button>
        File path: <strong id="filePath"></strong>
      </div>
    </div>
  );
}

export default App;
