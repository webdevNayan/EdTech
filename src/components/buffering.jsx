import Spinner from 'react-bootstrap/Spinner';

function Buffering() {
  return (
    <>
      <h1> Loading ... </h1>
      <Spinner animation="border" size="sm" />
      <Spinner animation="border" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" />
    </>
  );
}

export default Buffering;