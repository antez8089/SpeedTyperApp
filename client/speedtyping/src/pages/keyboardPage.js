import Keyboard from "../components/Keyboard";


function KeyboardPage() {
  return (
    <div className='container'>
      <div className='text' contentEditable></div>
      <Keyboard></Keyboard>
    </div>
  );
}

export default KeyboardPage;