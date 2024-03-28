import Keyboard from "../components/Keyboard";


function KeyboardPage() {
  
  return (
    <div className='container'>
      <div className="text-container">
        <h4>Let's Type</h4>
        <h3>Tutaj bedzie tekst sie zmieniał</h3>
        <div className='text' contentEditable></div>
      </div>
      <Keyboard></Keyboard>
    </div>
  );
}

export default KeyboardPage;